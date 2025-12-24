"use client";

import React from "react";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 bg-background">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <section className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardWrapper;
