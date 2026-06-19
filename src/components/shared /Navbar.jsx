"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import NavLink from "./NavLink";
import { ThemeSwitch } from "../../hooks/useTheme";
import { NavbarSkeleton } from "./NavbarSkeleton";
import { FaDumbbell } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const user = {
    name: "fahad",
  };

  const isPending = false;
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    ["rgba(var(--background-rgb), 0)", "rgba(var(--background-rgb), 0.8)"],
  );

  const handleSignOut = async () => {
    await authClient.signOut();
    // router.push("/login");
    await refetch();
    router.refresh();
  };

  const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/classes", label: "All Classes" },
    { href: "/forum", label: "Community Forum" },

    ...(user?.role === "member"
      ? [
          { href: "/dashboard/member", label: "Dashboard" },
          { href: "/my-bookings", label: "My Bookings" },
        ]
      : []),

    ...(user?.role === "trainer"
      ? [
          { href: "/dashboard/trainer", label: "Dashboard" },
          { href: "/manage-classes", label: "Manage Classes" },
        ]
      : []),

    ...(user?.role === "admin"
      ? [
          { href: "/dashboard/admin", label: "Dashboard" },
          { href: "/manage-users", label: "Manage Users" },
        ]
      : []),
  ];

  const initialUser = user?.name
    .trim()
    ?.split(" ")
    ?.slice(0, 2)
    ?.map((i) => i[0].toUpperCase());

  return (
    <header>
      <motion.nav
        style={{
          backgroundColor,
          backdropFilter: "blur(12px)",
          borderBottomColor: "var(--border)",
        }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b transition-colors duration-500"
      >
        <Link href="/" className="group flex items-center gap-3">
          <div
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-orange-500 shadow-lg
group-hover:scale-110
group-hover:rotate-180
group-hover:shadow-orange-500/50
group-hover:shadow-2xl
transition-all duration-300 ease-out"
          >
            <FaDumbbell className="text-white text-xl group-hover:scale-125 transition-transform duration-300" />
          </div>
          <span className="text-2xl font-extrabold tracking-wider uppercase">
            <span className="text-foreground">GYM</span>
            <span className="text-orange-500">ORA</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <NavLink
                href={l.href}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center justify-center">
            <ThemeSwitch />
          </div>

          {isPending ? (
            <NavbarSkeleton />
          ) : user ? (
            <Dropdown>
              <Dropdown.Trigger className="rounded-full">
                <Avatar className="cursor-pointer">
                  <Avatar.Image alt={user?.name} src={user?.image} />
                  <Avatar.Fallback>{initialUser}</Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover>
                <div className="px-3 pt-3 pb-1">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image alt={user?.name} src={user?.image} />
                      <Avatar.Fallback>{initialUser}</Avatar.Fallback>
                    </Avatar>

                    <div className="flex flex-col gap-0">
                      <p className="text-sm leading-5 font-medium">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item key="my-listing" textValue="My Listing">
                    <Link href="/my-listing" className="w-full block">
                      <Label>My Listing</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item key="my-bookings" textValue="My Bookings">
                    <Link href="/my-bookings" className="w-full block">
                      <Label>My Bookings</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    key="logout"
                    textValue="Logout"
                    color="danger"
                    onClick={handleSignOut}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <Label>Log Out</Label>
                      <FaArrowUpRightFromSquare className="size-3.5 text-danger" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="light"
                  size="sm"
                  className="font-medium text-foreground"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  className="bg-accent text-accent-foreground shadow-lg shadow-accent/20 font-semibold"
                  size="sm"
                >
                  Join Free
                </Button>
              </Link>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1.5 text-foreground hover:bg-default-100 rounded-lg transition-colors"
          >
            {isOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </div>

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-screen w-full sm:w-80 bg-background/95 backdrop-blur-xl p-8 z-60 shadow-2xl md:hidden border-l border-border"
        >
          <div className="flex justify-end items-center mb-10">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-surface rounded-full transition-colors text-foreground"
            >
              <HiX size={28} />
            </button>
          </div>

          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map((l) => (
              <li key={l.href} onClick={() => setIsOpen(false)}>
                <NavLink
                  href={l.href}
                  className="text-2xl! font-bold  hover:text-accent transition-colors"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}

            {!isPending && !user && (
              <div className="flex flex-col gap-4 mt-8">
                <Link href={"/register"}>
                  <Button
                    className="bg-accent text-accent-foreground font-bold"
                    fullWidth
                    size="lg"
                  >
                    Join Now
                  </Button>
                </Link>
                <Link href={"/login"}>
                  <Button
                    variant="bordered"
                    fullWidth
                    size="lg"
                    className="border-border text-foreground font-bold"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </ul>
        </motion.div>
      </motion.nav>

      <div className="h-18"></div>
    </header>
  );
};

export default Navbar;
