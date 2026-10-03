import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import ts from 'typescript';

async function loadAuth() {
  process.env.NEXT_PUBLIC_API_BASE_URL = 'https://api.example.com';
  const source = await readFile(new URL('../lib/api/auth.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  const stored = {};
  globalThis.localStorage = { getItem: (key) => stored[key] ?? null, setItem: (key, value) => { stored[key] = value; } };
  const auth = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}#${crypto.randomUUID()}`);
  return { auth, stored };
}
const response = (status, body) => new Response(JSON.stringify(body), { status });

for (const mode of ['login', 'signup']) {
  test(`${mode} sends credentials to the API and confirms the cookie identity`, async () => {
    const { auth, stored } = await loadAuth();
    const paths = [];
    globalThis.fetch = async (url, options) => {
      paths.push(new URL(url).pathname);
      assert.equal(options.credentials, 'include');
      assert.equal(options.cache, 'no-store');
      if (paths.length === 1) {
        assert.equal(options.method, 'POST');
        assert.deepEqual(JSON.parse(options.body), { email: 'fixture@example.com', password: 'synthetic-input' });
      }
      return response(200, { id: 'fixture-user' });
    };
    assert.equal((await auth.authenticate(mode, { email: 'fixture@example.com', password: 'synthetic-input' })).id, 'fixture-user');
    assert.deepEqual(paths, [`/auth/${mode}`, '/auth/me']);
    const [event] = JSON.parse(stored['prombutter.authEvents']);
    assert.equal(event.result, 'success');
    assert.match(event.timestamp, /Z$/);
    assert.deepEqual(Object.keys(event).sort(), ['duration_ms', 'event', 'reason', 'request_id', 'result', 'timestamp']);
    assert.ok(!stored['prombutter.authEvents'].includes('fixture@example.com'));
    assert.ok(!stored['prombutter.authEvents'].includes('synthetic-input'));
  });
}

test('failed credentials never confirm an old cookie', async () => {
  const { auth, stored } = await loadAuth();
  let calls = 0;
  globalThis.fetch = async () => { calls++; return response(401, { error_code: 'ERR-AUTH-002' }); };
  await assert.rejects(auth.authenticate('login', { email: 'fixture@example.com', password: 'synthetic-input' }), { code: 'ERR-AUTH-002' });
  assert.equal(calls, 1);
  assert.equal(JSON.parse(stored['prombutter.authEvents'])[0].reason, 'ERR-AUTH-002');
});

test('a cookie belonging to a different account cannot complete login', async () => {
  const { auth } = await loadAuth();
  globalThis.fetch = async (url) => response(200, { id: url.endsWith('/auth/me') ? 'old-account' : 'new-account' });
  await assert.rejects(auth.authenticate('login', {}), { code: 'SESSION_COOKIE_FAILED' });
});

test('missing cookies and network failure preserve diagnostic classifications', async () => {
  const { auth, stored } = await loadAuth();
  globalThis.fetch = async (url) => url.endsWith('/auth/me') ? response(401, { error_code: 'ERR-AUTH-001' }) : response(200, { id: 'fixture-user' });
  await assert.rejects(auth.authenticate('login', {}), { code: 'ERR-AUTH-001' });
  globalThis.fetch = async () => { throw new TypeError('synthetic network failure'); };
  await assert.rejects(auth.authenticate('login', {}));
  assert.deepEqual(JSON.parse(stored['prombutter.authEvents']).map((event) => event.reason), ['ERR-AUTH-001', 'NETWORK_ERROR']);
});

test('workspace lookup uses the authenticated API account', async () => {
  const { auth } = await loadAuth();
  globalThis.fetch = async (url) => { assert.equal(new URL(url).pathname, '/workspaces'); return response(200, { id: 'actual-workspace' }); };
  assert.equal(await auth.getCurrentWorkspaceId(), 'actual-workspace');
  const url = new URL(auth.googleLoginUrl('https://frontend.example.com'));
  assert.equal(url.pathname, '/auth/oauth/google/redirect');
  assert.equal(url.searchParams.get('redirect_uri'), 'https://frontend.example.com/auth/callback');
});

test('local log storage failure does not invalidate an authenticated session', async () => {
  const { auth } = await loadAuth();
  globalThis.localStorage.setItem = () => { throw new Error('synthetic quota failure'); };
  globalThis.fetch = async () => response(200, { id: 'fixture-user' });
  const original = console.warn;
  const warnings = [];
  console.warn = (...args) => warnings.push(args);
  try {
    assert.equal((await auth.authenticate('login', {})).id, 'fixture-user');
    assert.equal(warnings[0][0], '[prombutter] web_login_result storage_failed');
  } finally { console.warn = original; }
});

test('expired GET sessions refresh once for concurrent requests then retry', async () => {
  const { auth } = await loadAuth();
  let refreshed = false;
  let finishRefresh;
  let refreshCalls = 0;
  globalThis.fetch = async (url, options) => {
    if (url.endsWith('/auth/refresh')) {
      assert.equal(options.method, 'POST');
      assert.equal(options.credentials, 'include');
      refreshCalls++;
      await new Promise((resolve) => { finishRefresh = resolve; });
      refreshed = true;
      return response(200, {});
    }
    return response(refreshed ? 200 : 401, refreshed ? { id: 'workspace-after-refresh' } : { error_code: 'ERR-AUTH-001' });
  };
  const first = auth.getCurrentWorkspaceId();
  const second = auth.getCurrentWorkspaceId();
  await new Promise((resolve) => setImmediate(resolve));
  finishRefresh();
  assert.deepEqual(await Promise.all([first, second]), ['workspace-after-refresh', 'workspace-after-refresh']);
  assert.equal(refreshCalls, 1);
});

test('unsuccessful refresh stops retrying and propagates authentication failure', async () => {
  const { auth } = await loadAuth();
  const paths = [];
  globalThis.fetch = async (url) => { paths.push(new URL(url).pathname); return response(401, { error_code: 'ERR-AUTH-001' }); };
  await assert.rejects(auth.getCurrentWorkspaceId(), { code: 'ERR-AUTH-001' });
  assert.deepEqual(paths, ['/workspaces', '/auth/refresh']);
});

test('failed OAuth callbacks cannot confirm a previous account and save the result', async () => {
  const { auth, stored } = await loadAuth();
  let calls = 0;
  globalThis.fetch = async () => { calls++; return response(200, { id: 'previous-account' }); };
  for (const href of ['https://frontend.example.com/auth/callback',
    'https://frontend.example.com/auth/callback?error=denied#provider=google&is_new_user=false',
    'https://frontend.example.com/auth/callback#provider=google&is_new_user=false&error=denied']) {
    await assert.rejects(auth.confirmOAuthSession(href), { code: 'OAUTH_CALLBACK_FAILED' });
  }
  assert.equal(calls, 0);
  assert.equal(JSON.parse(stored['prombutter.authEvents']).length, 3);
  assert.equal((await auth.confirmOAuthSession('https://frontend.example.com/auth/callback#provider=google&is_new_user=true')).id, 'previous-account');
  assert.equal(calls, 1);
});
