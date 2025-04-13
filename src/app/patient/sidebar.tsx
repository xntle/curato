import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"; // or wherever your sidebar is exported

import { LogOut } from "lucide-react";
import { ScanQrCode } from "lucide-react";
import { Calendar } from "lucide-react";
import { Bot } from "lucide-react";

const items = [
  { title: "Appointments", url: "/patient/appointments", icon: Calendar },
  { title: "Share My EHR", url: "/patient/shareRecord", icon: ScanQrCode },
];

const misc = [{ title: "Logout", url: "/", icon: LogOut }];

export default function PatientSidebar() {
  return (
    <>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <h1 className="text-xl ml-1 font-bold">curato</h1>
              <SidebarGroupLabel>Directory</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Actions</SidebarGroupLabel>
              <SidebarMenu>
                {misc.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </>
  );
}
