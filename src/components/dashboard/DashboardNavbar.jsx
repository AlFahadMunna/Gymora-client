"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaDumbbell } from "react-icons/fa";
import { FaArrowRightFromBracket, FaHouse } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";

const DashboardNavbar = ({ setOpen, open }) => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();

    router.push("/login");
    router.refresh();
  };

  const initials = user?.name
    ?.trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((word) => word[0].toUpperCase())
    ?.join("");

  return (
    <>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-default-200 bg-background/80 backdrop-blur-xl">
        <div className="flex h-full items-center justify-between px-4 lg:px-8">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <HiMenuAlt3 size={26} />
            </button>

            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-orange-500 shadow-lg transition-all duration-300 group-hover:scale-110">
                <FaDumbbell className="text-xl text-white" />
              </div>

              <div className="leading-none">
                <h1 className="text-xl font-black">
                  <span className="text-blue-600">GYM</span>
                  <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                    ORA
                  </span>
                </h1>

                <p className="text-[10px] uppercase tracking-[0.25em] text-default-500">
                  Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* Right */}
          {user && (
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger>
                <Avatar className="cursor-pointer">
                  <Avatar.Image src={user.image} alt={user.name} />
                  <Avatar.Fallback>{initials}</Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                {/* User Info */}
                <div className="border-b px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image src={user.image} alt={user.name} />
                      <Avatar.Fallback>{initials}</Avatar.Fallback>
                    </Avatar>

                    <div>
                      <p className="font-semibold text-sm">{user.name}</p>

                      <p className="text-xs text-default-500">{user.email}</p>
                    </div>
                  </div>
                </div>

                <Dropdown.Menu>
                  <Dropdown.Item key="home">
                    <Link href="/" className="flex items-center gap-2 w-full">
                      <FaHouse />
                      Home
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    key="logout"
                    color="danger"
                    onClick={handleSignOut}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>Sign Out</span>

                      <FaArrowRightFromBracket className="text-sm" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
};

export default DashboardNavbar;
