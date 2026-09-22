import path from "path"
import { Schema } from "./registry-schema"

type ComponentDefinition = Partial<
  Pick<
    Schema,
    | "dependencies"
    | "devDependencies"
    | "registryDependencies"
    | "cssVars"
    | "tailwind"
  >
> & {
  name: string
  description: string
  path: string
  files?: Array<{
    name: string
    path: string
  }>
}

export const components: ComponentDefinition[] = [
  {
    name: "form-provider",
    description:
      "A thin wrapper around react-hook-form's FormProvider that wires up the <form> element and its onSubmit handler.",
    path: path.join(__dirname, "../components/form/form-provider.tsx"),
    dependencies: ["react-hook-form"],
  },
  {
    name: "form-input",
    description:
      "A single-line text input bound to react-hook-form via Controller, with a label, description, and automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-input.tsx"),
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "input-group.tsx",
        path: path.join(__dirname, "../components/ui/input-group.tsx"),
      },
    ],
  },
  {
    name: "form-password",
    description:
      "A password input with a show/hide toggle, bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-password.tsx"),
    dependencies: [
      "react-hook-form",
      "zod",
      "@hookform/resolvers",
      "lucide-react",
    ],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "input-group.tsx",
        path: path.join(__dirname, "../components/ui/input-group.tsx"),
      },
    ],
  },
  {
    name: "form-textarea",
    description:
      "A multi-line text input bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-textarea.tsx"),
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "input-group.tsx",
        path: path.join(__dirname, "../components/ui/input-group.tsx"),
      },
    ],
  },
  {
    name: "form-select",
    description:
      "A single-choice dropdown bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-select.tsx"),
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "select.tsx",
        path: path.join(__dirname, "../components/ui/select.tsx"),
      },
    ],
  },
  {
    name: "form-checkbox",
    description:
      "A boolean checkbox bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-checkbox.tsx"),
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "checkbox.tsx",
        path: path.join(__dirname, "../components/ui/checkbox.tsx"),
      },
    ],
  },
  {
    name: "form-switch",
    description:
      "A boolean switch bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-switch.tsx"),
    dependencies: ["react-hook-form", "zod", "@hookform/resolvers"],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "switch.tsx",
        path: path.join(__dirname, "../components/ui/switch.tsx"),
      },
    ],
  },
  {
    name: "form-date-picker",
    description:
      "A date input with a calendar popover, bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-date-picker.tsx"),
    dependencies: [
      "react-hook-form",
      "zod",
      "@hookform/resolvers",
      "dayjs",
      "react-day-picker",
      "lucide-react",
    ],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "input-group.tsx",
        path: path.join(__dirname, "../components/ui/input-group.tsx"),
      },
      {
        name: "popover.tsx",
        path: path.join(__dirname, "../components/ui/popover.tsx"),
      },
      {
        name: "calendar.tsx",
        path: path.join(__dirname, "../components/ui/calendar.tsx"),
      },
    ],
  },
  {
    name: "form-number-field",
    description:
      "A numeric input with increment/decrement buttons, bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-number-field.tsx"),
    dependencies: [
      "react-hook-form",
      "zod",
      "@hookform/resolvers",
      "lucide-react",
    ],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "input-group.tsx",
        path: path.join(__dirname, "../components/ui/input-group.tsx"),
      },
      {
        name: "number-field.tsx",
        path: path.join(__dirname, "../components/ui/number-field.tsx"),
      },
    ],
  },
  {
    name: "form-phone-number",
    description:
      "A phone number input with a searchable country selector, bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-phone-number.tsx"),
    dependencies: [
      "react-hook-form",
      "zod",
      "@hookform/resolvers",
      "react-phone-number-input",
      "cmdk",
      "lucide-react",
    ],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
      {
        name: "phone-input.tsx",
        path: path.join(__dirname, "../components/ui/phone-input.tsx"),
      },
      {
        name: "command.tsx",
        path: path.join(__dirname, "../components/ui/command.tsx"),
      },
      {
        name: "popover.tsx",
        path: path.join(__dirname, "../components/ui/popover.tsx"),
      },
    ],
  },
  {
    name: "form-file",
    description:
      "A drag-and-drop file upload bound to react-hook-form via Controller, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-file.tsx"),
    dependencies: ["react-hook-form", "lucide-react"],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
    ],
  },
  {
    name: "form-array-field",
    description:
      "A repeatable list of inputs backed by react-hook-form's useFieldArray, with automatic Zod error display.",
    path: path.join(__dirname, "../components/form/form-array-field.tsx"),
    dependencies: ["react-hook-form", "lucide-react"],
    files: [
      {
        name: "field.tsx",
        path: path.join(__dirname, "../components/ui/field.tsx"),
      },
    ],
  },
]
