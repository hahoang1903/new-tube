"use client";

import type { LucideIcon } from "lucide-react";
import type { MouseEventHandler } from "react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

type SectionItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  auth?: boolean;
};

type SectionProps = {
  title?: string;
  items: SectionItem[];
};

const Section = ({ items, title }: SectionProps) => {
  const { isSignedIn } = useAuth();
  const clerk = useClerk();
  const path = usePathname();

  const makeItemClickHandler = (
    item: SectionItem,
  ): MouseEventHandler<HTMLButtonElement> => {
    return (e) => {
      if (item.auth && !isSignedIn) {
        e.preventDefault();
        clerk.openSignIn();
      }
    };
  };

  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={path === item.url}
                onClick={makeItemClickHandler(item)}
              >
                <Link href={item.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Section;
