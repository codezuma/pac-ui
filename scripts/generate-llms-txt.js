import {
  readdir as _readdir,
  readFile as _readFile,
  stat as _stat,
  writeFile as _writeFile,
  existsSync,
} from "fs"
import { basename, join } from "path"
import { promisify } from "util"

const readFile = promisify(_readFile)
const writeFile = promisify(_writeFile)
const readdir = promisify(_readdir)
const stat = promisify(_stat)

// Configuration
const DOCS_DIR = join(process.cwd(), "app", "docs")
const OUTPUT_FILE_FULL = join(process.cwd(), "llms-full.txt")
const OUTPUT_FILE_SHORT = join(process.cwd(), "llms.txt")
const COMPONENTS_FILE = join(process.cwd(), "scripts", "registry-components.ts")

// Organized in the order they should appear in the documentation
const COMPONENT_ORDER = [
  "introduction",
  "installation",
  "attribution",
  "form",
  "form-input",
  "form-password",
  "form-textarea",
  "form-select",
  "form-checkbox",
  "form-switch",
  "form-date-picker",
  "form-number-field",
  "form-phone-number",
  "form-file",
  "form-array-field",
]

/**
 * Read the entire page.mdx or page.tsx file from a component directory
 */
async function readComponentMdx(componentDir) {
  try {
    const pageMdxPath = join(componentDir, "page.mdx")
    const pageTsxPath = join(componentDir, "page.tsx")

    if (existsSync(pageMdxPath)) {
      return await readFile(pageMdxPath, "utf8")
    } else if (existsSync(pageTsxPath)) {
      return await readFile(pageTsxPath, "utf8")
    }

    // If neither exists, look for any .mdx file
    const files = await readdir(componentDir)
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    if (mdxFiles.length > 0) {
      return await readFile(join(componentDir, mdxFiles[0]), "utf8")
    }

    return ""
  } catch (error) {
    console.error(`Error reading MDX for ${basename(componentDir)}:`, error)
    return ""
  }
}

/**
 * Process documentation for a component
 */
async function processComponentDocs(componentName) {
  console.log(`Processing documentation for ${componentName}...`)
  const componentDir = join(DOCS_DIR, componentName)

  try {
    const dirExists = existsSync(componentDir)
    if (!dirExists) {
      console.warn(`Directory for ${componentName} does not exist.`)
      return ""
    }

    // Check if directory is a directory
    const dirStat = await stat(componentDir)
    if (!dirStat.isDirectory()) {
      return ""
    }

    // Read the full MDX content
    const fullMdxContent = await readComponentMdx(componentDir)

    if (!fullMdxContent.trim()) {
      console.warn(`No MDX content found for ${componentName}.`)
      return formatEmptyComponentSection(componentName)
    }

    return formatComponentSection(fullMdxContent)
  } catch (error) {
    console.error(`Error processing ${componentName}:`, error)
    return ""
  }
}

/**
 * Format the component section with the full MDX content
 */
function formatComponentSection(mdxContent) {
  return mdxContent + "\n\n"
}

/**
 * Format an empty component section when no MDX is found
 */
function formatEmptyComponentSection(componentName) {
  const formattedName =
    componentName.charAt(0).toUpperCase() +
    componentName.slice(1).replace(/-/g, " ")

  return `## ${formattedName}

**Path**: \`components/form/${componentName}.tsx\`

**Features**:
- Customizable styling
- Type-safe props
- Accessibility support

`
}

/**
 * Generate table of contents
 */
async function generateTableOfContents() {
  let toc = `## Table of Contents\n\n`

  // Add main sections
  toc += `- [Installation](#installation)\n`
  toc += `- [Introduction](#introduction)\n`
  toc += `- [Components](#components)\n`

  // Add component subsections
  const componentSections = COMPONENT_ORDER.filter(
    (section) =>
      !["introduction", "installation", "attribution"].includes(section)
  )

  componentSections.forEach((component) => {
    const formattedName =
      component.charAt(0).toUpperCase() + component.slice(1).replace(/-/g, " ")
    toc += `  - [${formattedName}](#${component})\n`
  })

  toc += `\n`

  return toc
}

/**
 * Generate main header section including title and description
 */
function generateHeaderSection() {
  return `# Pac UI

> Pac UI is a set of type-safe, customizable form components for React, built on react-hook-form and Zod. A FormProvider and a small family of Form* field components handle validation, error display, and accessibility for you.

Pac UI is built on top of shadcn/ui with the same design principles: copy the components into your project, own the code, and customize freely. It uses Next.js, React, and Tailwind CSS. Components are installed individually using the shadcn CLI.

`
}

/**
 * Generate resources section
 */
function generateResourcesSection() {
  return `## Resources

- [GitHub Repository](https://github.com/codezuma/pac-ui): Source code and issues
- [Installation Guide](https://pac.chandresh.dev/docs/installation): Detailed installation instructions
- [Component Documentation](https://pac.chandresh.dev/docs): Complete component API documentation
- [shadcn/ui Documentation](https://ui.shadcn.com): Documentation for the underlying UI component system
- [React Hook Form Documentation](https://react-hook-form.com): Documentation for the form state library Pac UI is built on
- [Zod Documentation](https://zod.dev): Documentation for the schema validation library Pac UI is built on
- [Next.js Documentation](https://nextjs.org/docs): Documentation for the Next.js framework
- [Tailwind CSS Documentation](https://tailwindcss.com/docs): Documentation for the Tailwind CSS framework
`
}

/**
 * Generate short components list for llms.txt
 */
async function generateShortComponentsList() {
  console.log("Generating short components list...")
  try {
    if (!existsSync(COMPONENTS_FILE)) {
      console.warn(`Components file not found at ${COMPONENTS_FILE}`)
      return ""
    }

    const componentsContent = await readFile(COMPONENTS_FILE, "utf8")

    // Extract component objects using regex - handle multiline descriptions
    const componentBlocks =
      componentsContent.match(/{[\s\S]*?},?(?=\s*{|\s*])/g) || []
    const components = []

    componentBlocks.forEach((block) => {
      const nameMatch = block.match(/name:\s*"([^"]+)"/)
      const descMatch = block.match(/description:\s*"([^"]+)"/)
      const pathMatch = block.match(/path:\s*path\.join\([^,]+,\s*"([^"]+)"\)/)

      if (nameMatch && descMatch && pathMatch) {
        components.push({
          name: nameMatch[1],
          description: descMatch[1],
          path: pathMatch[1],
        })
      }
    })

    let componentsList = `## Components\n\n`

    components.forEach((component) => {
      // Extract just the filename from the path
      const filename = component.path.split("/").pop() || component.path
      componentsList += `- [components/form/${filename}](https://github.com/codezuma/pac-ui/blob/main/components/form/${filename}): ${component.description}\n`
    })

    return componentsList + "\n"
  } catch (error) {
    console.error("Error generating short components list:", error)
    return ""
  }
}

/**
 * Generate short version llms.txt
 */
async function generateShortLlmsTxt() {
  try {
    console.log("Starting llms.txt generation...")

    // Generate header
    const header = generateHeaderSection()

    // Generate documentation section
    const documentation = `## Documentation

- [README](https://github.com/codezuma/pac-ui/blob/main/README.md): Installation instructions and basic usage guide
- [Installation](https://pac.chandresh.dev/docs/installation): Detailed installation guide, how to install Pac UI components

`

    // Generate components list
    const componentsList = await generateShortComponentsList()

    // Generate optional resources
    const optionalResources = `## Optional

- [shadcn/ui Documentation](https://ui.shadcn.com): Documentation for the underlying UI component system
- [React Hook Form Documentation](https://react-hook-form.com): Documentation for the form state library Pac UI is built on
- [Zod Documentation](https://zod.dev): Documentation for the schema validation library Pac UI is built on
- [Next.js Documentation](https://nextjs.org/docs): Documentation for the Next.js framework
- [Tailwind CSS Documentation](https://tailwindcss.com/docs): Documentation for the Tailwind CSS framework
`

    // Combine all sections
    const shortContent = `${header}${documentation}${componentsList}${optionalResources}`

    // Write to file
    await writeFile(OUTPUT_FILE_SHORT, shortContent)

    console.log(`llms.txt generated successfully at ${OUTPUT_FILE_SHORT}`)
  } catch (error) {
    console.error("Error generating llms.txt:", error)
    process.exit(1)
  }
}

/**
 * Main function to generate llms-full.txt
 */
async function generateFullLlmsTxt() {
  try {
    console.log("Starting llms-full.txt generation...")

    // Generate header
    const header = generateHeaderSection()
    console.log("Header section generated")

    // Generate table of contents
    const tableOfContents = await generateTableOfContents()
    console.log("Table of contents generated")

    // Generate component sections
    let componentsContent = "## Components\n\n"

    for (const componentName of COMPONENT_ORDER) {
      // Process component docs
      const sectionContent = await processComponentDocs(componentName)
      componentsContent += sectionContent
    }
    console.log("Components section generated")

    // Generate resources section
    const resources = generateResourcesSection()
    console.log("Resources section generated")

    // Combine all sections
    const fullContent = `${header}${tableOfContents}${componentsContent}${resources}`

    // Write to file
    await writeFile(OUTPUT_FILE_FULL, fullContent)

    console.log(`llms-full.txt generated successfully at ${OUTPUT_FILE_FULL}`)
  } catch (error) {
    console.error("Error generating llms-full.txt:", error)
    process.exit(1)
  }
}

// Run both scripts
async function generateAllFiles() {
  try {
    await generateShortLlmsTxt()
    await generateFullLlmsTxt()
    console.log("All files generated successfully!")
  } catch (error) {
    console.error("Error generating files:", error)
    process.exit(1)
  }
}

generateAllFiles()
