"use client";

import React from "react";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { ModeToggle } from "@/components/mode-toggle";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarOpen } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state => state.global.isSidebarOpen));
  return (
    <nav className="h-16 flex items-center justify-between gap-4 px-4 border-b border-border bg-card shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-muted transition-colors"
        >
          <BsLayoutTextSidebarReverse className="h-5 w-5 text-foreground" />
        </button>
        {isSidebarOpen && (
          <div className="font-semibold text-lg text-foreground">Dashboard</div>
        )}
      </div>
      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;