'use client'

import Link from "next/link"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "./ui/sidebar"
import { Home, LayoutDashboardIcon, SquareUserRound } from "lucide-react"

export default function MainSidebar() {
    return (
        <Sidebar collapsible="icon" className="overflow-hidden">
            <SidebarHeader className="flex-row">
                <SidebarTrigger />
                <span className="text-xl text-nowrap">Trovee</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/home">
                                    <Home />
                                    <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild>
                                    <Link href="/applications">
                                    <LayoutDashboardIcon />
                                    <span>Applications</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuButton asChild>
                                    <Link href="/profile">
                                    <SquareUserRound />
                                    <span>Profile</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}