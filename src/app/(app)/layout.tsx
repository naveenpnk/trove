import MainSidebar from "@/components/MainSidebar";
import Navbar from "@/components/Navbar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function AppLayout({children}: {children: React.ReactNode}) {
    return (
         <div className="flex w-full">
          <MainSidebar />
            <main className="w-full">
              {/* <div className="flex w-full">
              <Navbar />
              </div> */}
              {children}
            </main>
        </div>
    )
}