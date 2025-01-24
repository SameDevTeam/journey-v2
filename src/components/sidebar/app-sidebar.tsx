import * as React from "react"
import {
  Frame,
  Map,
  PieChart,
} from "lucide-react"

import { NavProjects } from "@/components/sidebar/nav-projects"
import { NavUser } from "@/components/sidebar/nav-user"
import { useAuthStore } from "@/stores/auth"
import { useLogout } from "@/hooks/auth"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import SameupLogo from '@/assets/images/sameup-logo-2.png'

// This is sample data.
const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  // navMain: [
  //   {
  //     title: "Playground",
  //     url: "#",
  //     icon: SquareTerminal,
  //     isActive: true,
  //     items: [
  //       {
  //         title: "History",
  //         url: "#",
  //       },
  //       {
  //         title: "Starred",
  //         url: "#",
  //       },
  //       {
  //         title: "Settings",
  //         url: "#",
  //       },
  //     ],
  //   }
  // ],
  projects: [
    {
      name: "Dil Yönetimi",
      url: "#",
      icon: Frame,
    },
    {
      name: "Bileşen Yönetimi",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Şablon Yönetimi",
      url: "#",
      icon: Map,
    },
    {
      name: "Sayfa Yönetimi",
      url: "#",
      icon: Map,
    },
    {
      name: "Dosya Yönetimi",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore()
  const logout = useLogout()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src={SameupLogo} className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SameUp CMS</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={() => logout.mutate()} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
