"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiX } from "react-icons/hi";

const DashboardSidebar = ({ open, setOpen, menu }) => {
  const pathname = usePathname();

  const { data: session } = authClient.useSession();

  const role = session?.user?.role || "member";

  const items = menu[role];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen w-72 border-r border-default-200 bg-background/95 backdrop-blur-xl transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"}
      lg:top-16 lg:h-[calc(100vh-64px)] lg:translate-x-0`}
    >
      <div className="flex items-center justify-between border-b p-5 lg:hidden">
        <span className="font-semibold">Menu</span>

        <button onClick={() => setOpen(false)}>
          <HiX size={24} />
        </button>
      </div>

      <nav className="space-y-2 p-4">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all
              ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg"
                  : "hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-orange-500/10 hover:text-blue-600"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
