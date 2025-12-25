 "use client";

import React, { useEffect, memo, useState, useRef } from "react";
import { useGroupRef } from "react-resizable-panels";
import Navbar from "./(components)/Navbar";
import Sidebar from "./(components)/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SIDEBAR_CONFIG } from "./constants/sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const isDarkMode = useAppSelector((state => state.global.isDarkMode));
    const [sidebarWidth, setSidebarWidth] = useState<number>(0);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const groupRef = useGroupRef();

    // localStorage'dan sidebar genişliğini oku (lazy initializer)
    const [defaultSize] = useState<number>(() => {
        if (typeof window !== "undefined") {
            const savedSize = localStorage.getItem(SIDEBAR_CONFIG.STORAGE_KEY);
            if (savedSize) {
                const parsedSize = parseFloat(savedSize);
                if (parsedSize >= SIDEBAR_CONFIG.MIN_SIZE_PERCENT) {
                    return parsedSize;
                }
            }
        }
        return SIDEBAR_CONFIG.DEFAULT_SIZE_PERCENT;
    });

    // Dark mode class'ını DOM'a uygula
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    // Sidebar genişliğini takip et
    useEffect(() => {
        if (!sidebarRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setSidebarWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(sidebarRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Kompakt mod kontrolü
    const isCompact = sidebarWidth > 0 && sidebarWidth < SIDEBAR_CONFIG.COMPACT_MODE_THRESHOLD_PX;

    // Layout değişikliğini handle et - Minimum genişlik kontrolü
    const handleLayoutChange = (layout: { [key: string]: number }) => {
        const sidebarSize = layout["sidebar"] || SIDEBAR_CONFIG.DEFAULT_SIZE_PERCENT;
        
        // Minimum genişlik kontrolü - eğer altına düşerse engelle
        if (sidebarSize < SIDEBAR_CONFIG.MIN_SIZE_PERCENT && groupRef.current) {
            // Minimum genişlikte tut - tüm panellerin toplamı %100 olmalı
            const newMainSize = 100 - SIDEBAR_CONFIG.MIN_SIZE_PERCENT;
            groupRef.current.setLayout({ sidebar: SIDEBAR_CONFIG.MIN_SIZE_PERCENT, main: newMainSize });
            return;
        }
        
        // localStorage'a kaydet
        if (typeof window !== "undefined" && sidebarSize >= SIDEBAR_CONFIG.MIN_SIZE_PERCENT) {
            localStorage.setItem(SIDEBAR_CONFIG.STORAGE_KEY, sidebarSize.toString());
        }
    };

    // Sidebar resize handler - Minimum kontrolü
    const handleSidebarResize = (panelSize: { asPercentage: number; inPixels: number }) => {
        // Eğer minimum değerin altına düşerse, minimum değerde tut
        if ((panelSize.asPercentage < SIDEBAR_CONFIG.MIN_SIZE_PERCENT || panelSize.inPixels < SIDEBAR_CONFIG.MIN_WIDTH_PX) && groupRef.current) {
            const newMainSize = 100 - SIDEBAR_CONFIG.MIN_SIZE_PERCENT;
            groupRef.current.setLayout({ sidebar: SIDEBAR_CONFIG.MIN_SIZE_PERCENT, main: newMainSize });
        }
    };

  return (
    <div className="h-screen w-full bg-background text-foreground">
      {/* Desktop - Resizable Layout */}
      <div className="hidden md:block h-full">
        <ResizablePanelGroup 
          orientation="horizontal" 
          className="h-full"
          onLayoutChange={handleLayoutChange}
          groupRef={groupRef}
        >
          {/* Sidebar Panel - Her zaman görünür */}
          <ResizablePanel
            id="sidebar"
            defaultSize={defaultSize}
            minSize={SIDEBAR_CONFIG.MIN_SIZE_PERCENT}
            style={{ minWidth: `${SIDEBAR_CONFIG.MIN_WIDTH_PX}px` }}
            onResize={handleSidebarResize}
          >
            <div 
              ref={sidebarRef} 
              className="h-full w-full"
              style={{ minWidth: `${SIDEBAR_CONFIG.MIN_WIDTH_PX}px` }}
            >
              <Sidebar
                isSidebarOpen={true}
                setIsSidebarOpen={() => {}}
                isCompact={isCompact}
              />
            </div>
          </ResizablePanel>

          {/* Resizable Handle */}
          <ResizableHandle withHandle />

          {/* Main Content Panel */}
          <ResizablePanel id="main" defaultSize={80} minSize={0}>
            <main className="flex-1 flex flex-col min-w-0 bg-background h-full">
              <Navbar />
              <section className="flex-1 overflow-auto p-6 bg-background">
                {children}
              </section>
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile - Normal Layout */}
      <div className="md:hidden h-full">
        <div className="flex h-full">
          <Sidebar
            isSidebarOpen={isMobileSidebarOpen}
            setIsSidebarOpen={setIsMobileSidebarOpen}
          />
          <main className="flex-1 flex flex-col min-w-0 bg-background">
            <Navbar />
            <section className="flex-1 overflow-auto p-6 bg-background">
              {children}
            </section>
          </main>
        </div>
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </div>
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

export default memo(DashboardWrapper);
