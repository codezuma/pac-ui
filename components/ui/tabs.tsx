"use client"

import { cn } from "@/lib/utils"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

function Tabs({ ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />
}

function TabsList({
  className,
  children,
  ...props
}: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      className={cn(
        "relative inline-flex h-10 w-full items-center justify-start border-b bg-transparent text-zinc-900 dark:border-zinc-800 dark:text-zinc-50",
        className
      )}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator className="absolute bottom-0 left-0 flex h-0.5 w-(--active-tab-width) translate-x-(--active-tab-left) justify-center bg-foreground transition-[width,translate] duration-200 ease-in-out" />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      className={cn(
        "ring-offset-background focus-visible:ring-ring group text-muted-foreground relative inline-flex h-10 items-center justify-center rounded-none bg-transparent px-4 py-1 pt-2 pb-3 text-sm font-medium whitespace-nowrap transition-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:text-zinc-950 dark:text-zinc-500 dark:data-active:text-white",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      className={cn(
        "focus-visible:ring-ring relative mt-2 rounded-md ring-offset-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
