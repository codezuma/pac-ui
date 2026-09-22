"use client"

import { PacUiLogo } from "@/components/app/icon/pac-ui-logo"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./app-sidebar"
import { routes } from "./routes"

const coreMenuItems = routes
  .filter((route) => route.type === "core")
  .map((route) => ({
    title: route.label,
    url: route.path,
  }))

const componentsMenuItems = routes
  .filter((route) => route.type === "component")
  .map((route) => ({
    title: route.label,
    url: route.path,
    isNew: route.isNew ?? false,
  }))

function ButtonThemeCycleToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const current = theme ?? "light"
  const next =
    current === "light" ? "dark" : current === "dark" ? "system" : "light"

  const handleClick = () => {
    setTheme(next)
  }

  const label =
    current === "system" ? "System" : current === "dark" ? "Dark" : "Light"

  return (
    <SidebarMenuButton
      type="button"
      onClick={handleClick}
      className={cn(
        "hover:bg-sidebar-accent/50 active:bg-sidebar-accent/50 hover:text-primary w-auto text-lg transition-all duration-150 md:text-sm"
      )}
      aria-label={`Theme: ${label}. Click to switch to ${next}`}
    >
      {label}
    </SidebarMenuButton>
  )
}

const llms = [
  {
    title: "llms.txt",
    url: "/llms.txt",
  },
  {
    title: "llms-full.txt",
    url: "/llms-full.txt",
  },
]

export function AppSidebar() {
  const currentPath = usePathname()
  const { setOpenMobile } = useSidebar()

  useEffect(() => {
    setOpenMobile(false)
  }, [setOpenMobile])

  return (
    <Sidebar className="h-full border-none shadow-none">
      <SidebarContent
        className="bg-sidebar border-border relative border-r border-dashed"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex h-full flex-col pb-20 pl-0">
          <SidebarHeader className="hidden items-start px-5 pt-8 md:flex">
            <Link
              href="/"
              className="flex items-center gap-2 pl-2 text-xl font-medium tracking-tighter"
            >
              <PacUiLogo className="text-foreground size-6" />
              <h1 className="leading-none">Pac UI</h1>
            </Link>
          </SidebarHeader>
          <SidebarGroup className="border-none pr-0 pl-2 md:px-5 md:pt-[3.6rem]">
            <SidebarGroupLabel className="text-lg md:text-sm">
              Get Started
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {coreMenuItems.map((item) => {
                  const isActive = currentPath === item.url

                  return (
                    <SidebarMenuItem key={item.title} className="flex">
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        className={cn(
                          "hover:bg-sidebar-accent/50 active:bg-sidebar-accent/50 hover:text-primary w-auto text-lg transition-all duration-150 md:text-sm",
                          isActive &&
                          "text-primary bg-sidebar-accent hover:bg-sidebar-accent font-medium"
                        )}
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupLabel className="mt-8 text-lg md:text-sm">
              Components
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {componentsMenuItems.map((item) => {
                  const isActive = currentPath === item.url
                  const showNewBadge = item.isNew

                  return (
                    <SidebarMenuItem key={item.title} className="flex">
                      <SidebarMenuButton
                        render={
                          <Link
                            href={item.url}
                            className={cn(
                              "flex items-center gap-2",
                              showNewBadge && "text-inherit"
                            )}
                          />
                        }
                        className={cn(
                          "hover:bg-sidebar-accent/50 active:bg-sidebar-accent/50 hover:text-primary w-auto text-lg transition-all duration-150 md:text-sm",
                          isActive &&
                          "text-primary bg-sidebar-accent hover:bg-sidebar-accent font-medium"
                        )}
                      >
                        <span>{item.title}</span>
                        {showNewBadge && (
                          <span className="text-primary text-xs leading-none">
                            new
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupLabel className="mt-8 flex text-lg md:text-sm">
              LLMs
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {llms.map((item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={<Link href={item.url} />}
                        className={cn(
                          "hover:bg-sidebar-accent/50 active:bg-sidebar-accent/50 hover:text-primary w-auto text-lg transition-all duration-150 md:text-sm"
                        )}
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
            <SidebarGroupLabel className="mt-8 flex text-lg md:text-sm">
              Theme
            </SidebarGroupLabel>
            <SidebarGroupContent className="pb-12">
              <ButtonThemeCycleToggle />
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
