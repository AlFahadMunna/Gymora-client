"use client";

import React, { useState } from "react";
import {
  MdDashboard,
  MdPerson,
  MdFitnessCenter,
  MdForum,
  MdAssignment,
  MdPeople,
  MdManageAccounts,
  MdHowToReg,
} from "react-icons/md";

import { FaUsers, FaClipboardList } from "react-icons/fa";

import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const menu = {
  member: [
    {
      title: "Dashboard",
      href: "/dashboard/member",
      icon: <MdDashboard size={20} />,
    },
    {
      title: "My Profile",
      href: "/dashboard/member/profile",
      icon: <MdPerson size={20} />,
    },
    {
      title: "My Bookings",
      href: "/dashboard/member/bookings",
      icon: <MdFitnessCenter size={20} />,
    },
    {
      title: "Become a Trainer",
      href: "/dashboard/member/become-trainer",
      icon: <MdHowToReg size={20} />,
    },
  ],

  trainer: [
    {
      title: "Dashboard",
      href: "/dashboard/trainer",
      icon: <MdDashboard size={20} />,
    },
    {
      title: "My Profile",
      href: "/dashboard/trainer/profile",
      icon: <MdPerson size={20} />,
    },
    {
      title: "Add Class",
      href: "/dashboard/trainer/add-class",
      icon: <MdFitnessCenter size={20} />,
    },
    {
      title: "My Classes",
      href: "/dashboard/trainer/classes",
      icon: <MdAssignment size={20} />,
    },
    {
      title: "Community Posts",
      href: "/dashboard/trainer/forum",
      icon: <MdForum size={20} />,
    },
  ],

  admin: [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: <MdDashboard size={20} />,
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/users",
      icon: <FaUsers size={18} />,
    },
    {
      title: "Trainer Applications",
      href: "/dashboard/admin/trainers",
      icon: <MdManageAccounts size={20} />,
    },
    {
      title: "Manage Classes",
      href: "/dashboard/admin/classes",
      icon: <MdFitnessCenter size={20} />,
    },
    {
      title: "Community Posts",
      href: "/dashboard/admin/forum",
      icon: <FaClipboardList size={18} />,
    },
  ],
};

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-default-50">
      {/* Navbar */}

      <DashboardNavbar open={open} setOpen={setOpen} />

      {/* Sidebar */}

      <DashboardSidebar open={open} setOpen={setOpen} menu={menu} />

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
