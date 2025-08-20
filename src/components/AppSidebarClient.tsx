'use client'

import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode } from "react";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppSidebarClient({ children } : { children: ReactNode }) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="flex flex-col w-full">
                <div className="p-2 border-b flex items-center gap-2">
                    <SidebarTrigger />
                    <span className="text-xl">Trovee</span>
                </div>
                <div className="flex-1 flex">{children}</div>
            </div>
        )
    }
    
    return children;
}