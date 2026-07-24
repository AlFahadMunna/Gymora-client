"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import {
  MdDashboard,
  MdFitnessCenter,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

const menu = [
  {
    title: "Dashboard",
    icon: <MdDashboard size={20} />,
    href: "#",
  },
  {
    title: "Classes",
    icon: <MdFitnessCenter size={20} />,
    href: "#",
  },
  {
    title: "Profile",
    icon: <MdPerson size={20} />,
    href: "#",
  },
  {
    title: "Settings",
    icon: <MdSettings size={20} />,
    href: "#",
  },
];

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-default-50">
      {/* Navbar */}

      <DashboardNavbar open={open} setOpen={setOpen} />

      {/* Sidebar */}

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
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-orange-500/10 hover:text-blue-600"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}

      <main className="pt-20 lg:ml-72">
        <div className="min-h-[calc(100vh-80px)] p-4 md:p-6 lg:p-8">
          <div className="rounded-3xl border border-default-200 bg-background p-6 shadow-xl">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
