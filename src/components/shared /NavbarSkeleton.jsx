"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

export function NavbarSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-9 h-9 rounded-full" />
    </div>
  );
}
