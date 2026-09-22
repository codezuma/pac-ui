import fs from "fs"
import path from "path"
import type { MetadataRoute } from "next"

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://pac.chandresh.dev"
).replace(/\/+$/, "")

const staticRoutes = ["", "docs"]

function getDocsRoutes() {
  const docsDir = path.join(process.cwd(), "app", "docs")

  if (!fs.existsSync(docsDir)) {
    return []
  }

  const routes: string[] = []

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    entries.forEach((entry) => {
      const entryPath = path.join(currentDir, entry.name)

      if (entry.isDirectory()) {
        walk(entryPath)
        return
      }

      if (entry.name !== "page.tsx" && entry.name !== "page.mdx") {
        return
      }

      const relative = path.relative(docsDir, entryPath)
      const route = relative
        .replace(/\\/g, "/")
        .replace(/\/page\.(tsx|mdx)$/, "")

      routes.push(route ? `docs/${route}` : "docs")
    })
  }

  walk(docsDir)
  return routes
}

function buildUrl(route: string) {
  if (!route) {
    return BASE_URL
  }

  return `${BASE_URL}/${route.replace(/^\/+/, "")}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls = new Set<string>()

  staticRoutes.forEach((route) => {
    urls.add(buildUrl(route))
  })

  getDocsRoutes().forEach((route) => {
    urls.add(buildUrl(route))
  })

  return Array.from(urls).map((url) => ({ url }))
}
