"use client";
import {
  Bell,
  Envelope,
  Gear,
  House,
  LayoutSideContentLeft,
  Magnifier,
  Person,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import { useState } from "react";

export function DashboardSidebar() {
  const [active, setActive] = useState("Home");

  const navItems = [
    { icon: House, label: "Home" },
    { icon: Magnifier, label: "Search" },
    { icon: Bell, label: "Notifications" },
    { icon: Envelope, label: "Messages" },
    { icon: Person, label: "Profile" },
    { icon: Gear, label: "Settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-2 p-2">
      {navItems.map((item) => {
        const isActive = active === item.label;

        return (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            type="button"
            className={`
              group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium
              transition-all duration-200
              ${
                isActive
                  ? "bg-primary text-orange-500 shadow-md"
                  : "text-foreground hover:bg-default-200"
              }
            `}
          >
            <item.icon
              className={`size-5 transition ${
                isActive
                  ? "text-blue-500"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            />
            <span>{item.label}</span>

            {isActive && (
              <span className="ml-auto h-2 w-2 rounded-full bg-orange-500" />
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen w-64 flex-col border-r bg-background/80 backdrop-blur-md shadow-sm">
        <div className="p-4 text-lg font-semibold border-b">Dashboard</div>

        <div className="flex-1 overflow-y-auto py-4">{navContent}</div>
      </aside>

      {/* Mobile Drawer */}
      <Drawer>
        <Button className="lg:hidden m-3" variant="secondary">
          <LayoutSideContentLeft />
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </div>
  );
}
