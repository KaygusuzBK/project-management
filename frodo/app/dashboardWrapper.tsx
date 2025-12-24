"use client";

import React, { useEffect } from "react";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import StoreProvider, { RootState, useAppDispatch, useAppSelector } from "./redux";
import { setIsSidebarOpen } from "@/state";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const isSidebarOpen = useAppSelector((state => state.global.isSidebarOpen));
    const isDarkMode = useAppSelector((state => state.global.isDarkMode));
    const dispatch = useAppDispatch();
    // Dark mode useEffect
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },[isDarkMode]);


  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className={`flex-1 flex flex-col min-w-0 bg-background ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <section className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </section>
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardLayout;
