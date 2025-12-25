"use client";

import React from "react";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="h-16 flex items-center gap-4 px-6 border-b border-border bg-card shadow-sm">

      {/* Orta: Searchbar */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-lg">
          <input
            
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Sağ taraf: Bildirimler, Yardım ve Profil */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Bildirimler */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9"
        >
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* Yardım */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
        >
          <HelpCircle className="h-5 w-5 text-foreground" />
        </Button>

        {/* Ayırıcı */}
        <div className="h-8 w-px bg-border"></div>

        {/* Kullanıcı Bilgileri */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium text-foreground">Ahmet Yılmaz</p>
            <p className="text-xs text-muted-foreground">Ürün Yöneticisi</p>
          </div>
          {/* Avatar */}
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              AY
            </div>
            {/* Online durumu */}
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;