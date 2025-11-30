"use client"

import {CreditCardIcon, FolderOpenIcon, HistoryIcon, KeyIcon, LockIcon, LogOutIcon, StarIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItem = [
    {
        title: "Main",
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
    const pathName = usePathname();
    const router = useRouter();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
                        <Link href="/workflows" prefetch>
                         <Image src="/logo.svg" width={30} height={30} alt="Nodebase" />
                         <span className="font-semibold text-sm">Nodebase</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItem.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent>
                            {group.item.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                     tooltip={item.title}
                                     isActive={
                                        item.url == "/" ? pathName  == "/" : pathName.startsWith(item.url)
                                     }
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

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Upgrade to pro"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => { }}
                        >
                            <StarIcon height={4} width={4} />
                            <span>Upgrade to Pro</span>
                        </SidebarMenuButton>

                        <SidebarMenuButton
                            tooltip="Billing Portal"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => { }}
                        >
                            <CreditCardIcon height={4} width={4} />
                            <span>Billing Portal</span>
                        </SidebarMenuButton>

                        <SidebarMenuButton
                            tooltip="Sign Out"
                            className="gap-x-4 h-10 px-4"
                            onClick={() => authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () =>{
                                        router.push("/");
                                    }
                                }
                            })}
                        >
                            <LogOutIcon height={4} width={4} />
                            <span>Sign out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar;