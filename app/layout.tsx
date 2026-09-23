import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { LayoutClient } from "./layout.client"

export const metadata: Metadata = {
  title: "Pac UI",
  description:
    "A type-safe form system for React. FormProvider and Controller-backed field components built on react-hook-form and Zod, with validation, styling, and accessibility wired in by default.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://pac.chandresh.dev"
  ),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDev = process.env.NODE_ENV === "development"

  return (
    <html lang="en" suppressHydrationWarning>
      {!isDev ? (
        <Script defer src="https://assets.onedollarstats.com/stonks.js" />
      ) : null}
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutClient>{children}</LayoutClient>
        </ThemeProvider>
      </body>
    </html>
  )
}
