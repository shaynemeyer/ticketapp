"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MainNavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tickets", href: "/tickets" },
    { label: "Users", href: "/users" },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-2">
      {links.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`navbar-link ${
            currentPath === item.href &&
            "cursor-default text-primary/70 hover:text-primary/60"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};
export default MainNavLinks;
