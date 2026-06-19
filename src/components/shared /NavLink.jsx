"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, className, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative py-1 text-sm font-medium transition-colors duration-300 ${
        isActive
          ? "text-purple-600 dark:text-purple-400"
          : "text-muted hover:text-purple-600 dark:hover:text-purple-400"
      } ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
