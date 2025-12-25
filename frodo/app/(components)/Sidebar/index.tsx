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
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
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
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed md:static inset-y-0 left-0 z-40 ${
          isSidebarOpen ? "w-64" : "w-0 md:w-0"
        } bg-sidebar border-r border-sidebar-border shadow-sm md:shadow-none ${
          isSidebarOpen ? "p-4" : "p-0 md:p-0"
        } transform transition-all duration-300 ease-in-out overflow-hidden shrink-0 flex flex-col`}
      >
        <div
          className={`font-bold text-xl mb-4 text-sidebar-foreground transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Menü
        </div>
        {/* Navigasyon menüsü */}
        <div className="flex flex-col flex-1">
          <ul
            className={`transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <li className="mb-2">
              <Link
                href="/"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 px-2 rounded-md hover:bg-sidebar-accent relative",
                  activeStates.home && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.home && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/timeline"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 px-2 rounded-md hover:bg-sidebar-accent relative",
                  activeStates.timeline && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.timeline && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <Clock className="h-4 w-4" />
                <span>Timeline</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/search"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 px-2 rounded-md hover:bg-sidebar-accent relative",
                  activeStates.search && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.search && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/users"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 px-2 rounded-md hover:bg-sidebar-accent relative",
                  activeStates.users && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.users && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/teams"
                prefetch={true}
                scroll={true}
                className={cn(
                  "flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 px-2 rounded-md hover:bg-sidebar-accent relative",
                  activeStates.teams && "bg-sidebar-accent text-sidebar-primary font-medium"
                )}
                onClick={handleLinkClick}
              >
                {activeStates.teams && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full" />
                )}
                <UsersRound className="h-4 w-4" />
                <span>Teams</span>
              </Link>
            </li>
          </ul>

          {/* Alt menü - Tema ve Ayarlar */}
          <div
            className={`mt-auto transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Tema Değiştirme - Sadece Icon, Sola Dayalı */}
            <div className="mb-2">
              <button
                type="button"
                onClick={handleThemeToggle}
                className={cn(
                  "relative w-full flex items-center justify-start text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 px-2 rounded-md hover:bg-sidebar-accent"
                )}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute left-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>

            {/* Ayarlar */}
            <button
              type="button"
              onClick={handleSettingsClick}
              className={cn(
                "w-full flex items-center gap-2 text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer py-2 px-2 rounded-md hover:bg-sidebar-accent"
              )}
            >
              <Settings className="h-4 w-4" />
              <span>Ayarlar</span>
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
