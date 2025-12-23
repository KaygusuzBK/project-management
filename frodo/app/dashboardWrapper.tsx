"use client"

import React from 'react';
import { ModeToggle } from '@/components/mode-toggle';

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:block md:w-64 bg-sidebar border-r border-sidebar-border shadow-sm p-4">
        <div className="font-bold text-xl mb-4 text-sidebar-foreground">Sidebar</div>
        {/* Buraya navigasyon veya menu koyabilirsiniz */}
        <ul>
          <li className="mb-2">
            <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary transition-colors">
              Dashboard
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary transition-colors">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="text-sidebar-foreground hover:text-sidebar-primary transition-colors">
              Profile
            </a>
          </li>
        </ul>
      </aside>
      
      <main className="flex-1 flex flex-col min-w-0 bg-background">
        {/* Navbar */}
        <nav className="h-16 flex items-center justify-between px-4 border-b border-border bg-card shadow-sm">
          <div className="font-semibold text-lg text-foreground">Navbar</div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {/* Buraya sağa ek ikonlar, profil, bildirimler eklenebilir */}
          </div>
        </nav>
        <section className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardWrapper;
