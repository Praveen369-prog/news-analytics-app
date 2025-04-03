"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, FileUp, Search, Users, Settings, Menu, Home, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update the routes array to reflect the expanded scope
  const routes = [
    {
      href: "/",
      icon: Home,
      title: "Dashboard",
    },
    {
      href: "/upload",
      icon: FileUp,
      title: "Create News",
    },
    {
      href: "/search",
      icon: Search,
      title: "Discover & Filter",
    },
    {
      href: "/profiles",
      icon: Users,
      title: "Person & Organization Profiles",
    },
    {
      href: "/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent
            routes={routes}
            pathname={pathname}
            toggleTheme={toggleTheme}
            theme={theme}
            isMounted={isMounted}
          />
        </SheetContent>
      </Sheet>

      <div className={cn("hidden md:flex flex-col w-64 bg-background border-r", className)}>
        <SidebarContent
          routes={routes}
          pathname={pathname}
          toggleTheme={toggleTheme}
          theme={theme}
          isMounted={isMounted}
        />
      </div>
    </>
  )
}

interface SidebarContentProps {
  routes: {
    href: string
    icon: React.ElementType
    title: string
  }[]
  pathname: string
  toggleTheme: () => void
  theme?: string
  isMounted: boolean
}

function SidebarContent({ routes, pathname, toggleTheme, theme, isMounted }: SidebarContentProps) {
  return (
    <>
      <div className="px-3 py-4 flex items-center border-b">
        <BarChart3 className="h-6 w-6 mr-2 text-primary" />
        <h1 className="text-xl font-bold">News Dashboard</h1>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Navigation</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                  pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.title}
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="p-3 border-t">
        <Button variant="outline" size="sm" className="w-full justify-start" onClick={toggleTheme}>
          {isMounted && theme === "dark" ? (
            <>
              <Sun className="h-4 w-4 mr-2" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 mr-2" />
              Dark Mode
            </>
          )}
        </Button>
      </div>
    </>
  )
}

