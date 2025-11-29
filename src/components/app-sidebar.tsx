"use client"

import {CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LockIcon, StarIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

const menuItem = [
    {
        title: "workflows",
        item: [
            {
                title: "Workflows",
                icon: FolderOpenIcon,
                url: "/workflows"
            },
            {
                title: "Credentials",
                icon: KeyIcon,
                url: "/credentials"
            },
            {
                title: "Executions",
                icon: HistoryIcon,
                url: "/executions"
            },

        ]
    }
]

const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                {menuItem.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            {group.item.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                     tooltip={item.title}
                                     isActive={false}
                                     asChild
                                     className="gap-x-4 h-10 px-4"
                                     >
                                        <Link href={item.url} prefetch>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar;