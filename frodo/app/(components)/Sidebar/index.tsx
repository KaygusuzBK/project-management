"use client";

import React, { useMemo, useCallback, memo, useState } from "react";
import { Settings, Home, Clock, Search, Users, UsersRound, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode } from "@/state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isCompact?: boolean;
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isCompact = false }: SidebarProps) => {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const isActive = useCallback((href: string) => {
    // Home için sadece tam eşleşme
    if (href === "/") {
      return pathname === "/";
    }
    // Diğer route'lar için pathname'in href ile başladığını kontrol et
    // Ama /users/123 gibi durumlarda /users aktif olmalı
    return pathname === href || pathname.startsWith(`${href}/`);
  }, [pathname]);

  // Aktif durumları memoize et
  const activeStates = useMemo(() => ({
    home: isActive("/"),
    timeline: isActive("/timeline"),
    search: isActive("/search"),
    users: isActive("/users"),
    teams: isActive("/teams"),
  }), [isActive]);

  // Mobile kontrolünü optimize et
  const handleLinkClick = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [setIsSidebarOpen]);

  // Settings popup'ını aç
  const handleSettingsClick = useCallback(() => {
    setIsSettingsOpen(true);
    // Mobile'da sidebar'ı kapat
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [setIsSidebarOpen]);

  // Tema toggle handler'ı - direkt light/dark arasında geçiş
  const handleThemeToggle = useCallback(() => {
    dispatch(setIsDarkMode(!isDarkMode));
  }, [dispatch, isDarkMode]);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          // Mobile: fixed positioning
          "fixed md:static",
          // Mobile: transform animations
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          // Positioning
          "inset-y-0 left-0 z-40",
          // Width - Desktop'ta resizable panel kontrol eder, mobile'da manuel
          isSidebarOpen ? "w-64 md:w-full" : "w-0 md:w-full",
          // Styling
          "bg-sidebar border-r border-sidebar-border shadow-sm md:shadow-none",
          isSidebarOpen ? (isCompact ? "p-2 md:p-2" : "p-4") : "p-0 md:p-4",
          // Layout
          "transform transition-all duration-300 ease-in-out overflow-hidden shrink-0 flex flex-col h-full",
          // Overflow kontrolü
          "overflow-y-auto overflow-x-hidden"
        )}
      >
        {!isCompact && (
          <div
            className={`font-bold text-xl mb-4 text-sidebar-foreground transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Menü
          </div>
        )}
        {/* Navigasyon menüsü */}
        <div className={cn(
          "flex flex-col flex-1",
          isCompact && "items-center"
        )}>
          <ul
            className={cn(
              "transition-opacity duration-300 w-full min-w-0",
              isSidebarOpen ? "opacity-100" : "opacity-0"
            )}
          >
            <li className="mb-2 w-full min-w-0">
              <Link
                href="/"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 rounded-md hover:bg-sidebar-accent relative w-full min-w-0 overflow-hidden",
                  isCompact ? "justify-center px-2 gap-0" : "px-2 gap-2",
                  activeStates.home && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.home && !isCompact && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <Home className="h-4 w-4 shrink-0" />
                {!isCompact && <span className="truncate min-w-0 shrink">Home</span>}
              </Link>
            </li>
            <li className="mb-2 w-full min-w-0">
              <Link
                href="/timeline"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 rounded-md hover:bg-sidebar-accent relative w-full min-w-0 overflow-hidden",
                  isCompact ? "justify-center px-2 gap-0" : "px-2 gap-2",
                  activeStates.timeline && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.timeline && !isCompact && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <Clock className="h-4 w-4 shrink-0" />
                {!isCompact && <span className="truncate min-w-0 shrink">Timeline</span>}
              </Link>
            </li>
            <li className="mb-2 w-full min-w-0">
              <Link
                href="/search"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 rounded-md hover:bg-sidebar-accent relative w-full min-w-0 overflow-hidden",
                  isCompact ? "justify-center px-2 gap-0" : "px-2 gap-2",
                  activeStates.search && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.search && !isCompact && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <Search className="h-4 w-4 shrink-0" />
                {!isCompact && <span className="truncate min-w-0 shrink">Search</span>}
              </Link>
            </li>
            <li className="mb-2 w-full min-w-0">
              <Link
                href="/users"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 rounded-md hover:bg-sidebar-accent relative w-full min-w-0 overflow-hidden",
                  isCompact ? "justify-center px-2 gap-0" : "px-2 gap-2",
                  activeStates.users && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.users && !isCompact && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <Users className="h-4 w-4 shrink-0" />
                {!isCompact && <span className="truncate min-w-0 shrink">Users</span>}
              </Link>
            </li>
            <li className="mb-2 w-full min-w-0">
              <Link
                href="/teams"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 rounded-md hover:bg-sidebar-accent relative w-full min-w-0 overflow-hidden",
                  isCompact ? "justify-center px-2 gap-0" : "px-2 gap-2",
                  activeStates.teams && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.teams && !isCompact && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <UsersRound className="h-4 w-4 shrink-0" />
                {!isCompact && <span className="truncate min-w-0 shrink">Teams</span>}
              </Link>
            </li>
          </ul>

          {/* Alt menü - Tema ve Ayarlar */}
          <div
            className={cn(
              "mt-auto transition-opacity duration-300 w-full",
              isSidebarOpen ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Tema Değiştirme - Sadece Icon */}
            <div className="mb-2 w-full">
              <button
                type="button"
                onClick={handleThemeToggle}
                className={cn(
                  "relative w-full flex items-center text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 rounded-md hover:bg-sidebar-accent",
                  isCompact ? "justify-center px-2" : "justify-start px-2"
                )}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 shrink-0" />
                <Moon className={cn(
                  "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 shrink-0",
                  isCompact ? "left-1/2 -translate-x-1/2" : "left-2"
                )} />
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>

            {/* Ayarlar */}
            <button
              type="button"
              onClick={handleSettingsClick}
              className={cn(
                "w-full min-w-0 flex items-center text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 rounded-md hover:bg-sidebar-accent overflow-hidden",
                isCompact ? "justify-center px-2 gap-0" : "px-2 gap-2"
              )}
            >
              <Settings className="h-4 w-4 shrink-0" />
              {!isCompact && <span className="truncate min-w-0 shrink">Ayarlar</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay (arka plan karartma) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ayarlar</DialogTitle>
            <DialogDescription>
              Uygulama ayarlarınızı buradan yönetebilirsiniz.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Ayarlar içeriği yakında eklenecek...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};



export default memo(Sidebar);
