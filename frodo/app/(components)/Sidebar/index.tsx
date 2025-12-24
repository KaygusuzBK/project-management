"use client";

import React from "react";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
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
        } transform transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div
          className={`font-bold text-xl mb-4 text-sidebar-foreground transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Sidebar
        </div>
        {/* Buraya navigasyon veya menu koyabilirsiniz */}
        <ul
          className={`transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <li className="mb-2">
            <a
              href="#"
              className="block text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer"
              onClick={() => {
                // Mobile'da link tıklandığında sidebar'ı kapat
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="block text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block text-sidebar-foreground hover:text-sidebar-primary transition-colors md:cursor-pointer"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              Profile
            </a>
          </li>
        </ul>
      </aside>

      {/* Mobile overlay (arka plan karartma) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;


