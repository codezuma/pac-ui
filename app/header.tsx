import { SidebarTrigger } from "@/app/app-sidebar"
import { useBreakpoint } from "@/hooks/use-breakpoint"
import Link from "next/link"

export type HeaderProps = {
  triggerViewportWidth: number
}

export function Header({ triggerViewportWidth }: HeaderProps) {
  const isMobileView = useBreakpoint(triggerViewportWidth)

  if (!isMobileView) {
    return null
  }

  return (
    <nav className="absolute top-0 left-0 z-60 w-full px-4 py-4 text-white">
      <div className="text-foreground mx-auto flex max-w-2xl items-center justify-between">
        <Link href="/" className="">
          <span className="font-[450]">Pac UI</span>
        </Link>
        <div className="flex items-center gap-2">
          <SidebarTrigger />
        </div>
      </div>
    </nav>
  )
}
