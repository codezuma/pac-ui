export type Route = {
  path: string
  label: string
  order: number
  type: "component" | "core"
  isNew?: boolean
}

export const routes: Route[] = [
  {
    path: "/",
    label: "Home",
    order: 0,
    type: "core",
  },
  {
    path: "/docs/introduction",
    label: "Introduction",
    order: 1,
    type: "core",
  },
  {
    path: "/docs/installation",
    label: "Installation",
    order: 2,
    type: "core",
  },
  {
    path: "/docs/attribution",
    label: "Attribution",
    order: 3,
    type: "core",
  },
  // Form
  {
    path: "/docs/form",
    label: "Form",
    order: 4,
    type: "component",
  },
  {
    path: "/docs/form-input",
    label: "Form Input",
    order: 5,
    type: "component",
  },
  {
    path: "/docs/form-password",
    label: "Form Password",
    order: 6,
    type: "component",
  },
  {
    path: "/docs/form-textarea",
    label: "Form Textarea",
    order: 7,
    type: "component",
  },
  {
    path: "/docs/form-select",
    label: "Form Select",
    order: 8,
    type: "component",
  },
  {
    path: "/docs/form-checkbox",
    label: "Form Checkbox",
    order: 9,
    type: "component",
  },
  {
    path: "/docs/form-switch",
    label: "Form Switch",
    order: 10,
    type: "component",
  },
  {
    path: "/docs/form-date-picker",
    label: "Form Date Picker",
    order: 11,
    type: "component",
  },
  {
    path: "/docs/form-number-field",
    label: "Form Number Field",
    order: 12,
    type: "component",
  },
  {
    path: "/docs/form-phone-number",
    label: "Form Phone Number",
    order: 13,
    type: "component",
  },
  {
    path: "/docs/form-file",
    label: "Form File",
    order: 14,
    type: "component",
  },
  {
    path: "/docs/form-array-field",
    label: "Form Array Field",
    order: 15,
    type: "component",
  },
]

export function getNavigation(currentPath: string) {
  const currentIndex = routes.findIndex((route) => route.path === currentPath)

  if (currentIndex === -1) return null

  return {
    prev: currentIndex > 0 ? routes[currentIndex - 1] : null,
    current: routes[currentIndex],
    next: currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null,
  }
}
