"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** 좌측 내비게이션. 활성 항목은 현재 경로로 판단한다. */
const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: "/assets/icon-dashboard.png" },
  { href: "/parts", label: "Parts", icon: "/assets/icon-parts.png" },
  { href: "/prompts", label: "Prompts", icon: "/assets/icon-prompts.png" },
  { href: "/trash", label: "Trash", icon: "/assets/icon-trash.png" },
];

export default function Lnb() {
  const pathname = usePathname();

  return (
    <nav className="lnb">
      <div className="lnb__logo">
        <Link href="/dashboard">
          <Image src="/assets/logo.svg" alt="Prombutter" width={206} height={31} priority />
        </Link>
      </div>

      <div className="lnb__nav">
        <p className="lnb__section-title">Workspace</p>
        <div className="lnb__list">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`lnb-item${pathname.startsWith(item.href) ? " is-active" : ""}`}
            >
              <span className="lnb-item__icon">
                <Image src={item.icon} alt="" width={30} height={30} />
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="lnb__footer">
        <Link className="lnb__settings" href="/settings">
          <Image src="/assets/icon-setting.png" alt="" width={27} height={30} />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
