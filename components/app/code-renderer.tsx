"use client"

import { codeToHtml } from "@/lib/shiki"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

type CodeRendererProps = {
  code: string
  lang: string
}

export function CodeRenderer({ code, lang }: CodeRendererProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
  const { theme } = useTheme()

  const themeName: Record<string, string> = {
    light: "github-light",
    dark: "github-dark",
    system: "github-dark",
  }

  useEffect(() => {
    async function highlight() {
      if (!code) {
        setHighlightedHtml("<pre><code></code></pre>")
        return
      }

      const html = await codeToHtml({
        code,
        lang,
        theme: themeName[theme as keyof typeof themeName],
      })
      setHighlightedHtml(html)
    }
    highlight()
  }, [code, lang, theme])

  // SSR fallback: render plain code if not hydrated yet
  return (
    <div className="not-prose max-h-[650px] overflow-auto rounded-md border border-border text-[13px]">
      {highlightedHtml ? (
        <div
          className="[&_pre]:m-0 [&_pre]:bg-background [&_pre]:p-4 [&_code]:text-foreground"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="m-0 bg-background p-4">
          <code className="text-foreground">{code}</code>
        </pre>
      )}
    </div>
  )
}
