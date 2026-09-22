# Pac UI

**Type-safe form components for React.**
A `FormProvider` and a small family of `Form*` field components, built on react-hook-form and Zod, so validation, error display, and accessibility come wired in.

## Installation

### Install shadcn/ui

First, you'll need to install and configure [shadcn/ui](https://ui.shadcn.com) in your project.
Follow the installation guide in the shadcn/ui documentation.

### Install Pac UI components

Once shadcn/ui is set up, you can install Pac UI components using the shadcn CLI:

```sh
npx shadcn@latest add "https://pac.chandresh.dev/c/[component].json"
```

### Usage

After installation, import and start using the components in your project:

```tsx
import { FormProvider } from "@/components/form/form-provider"
import { FormInput } from "@/components/form/form-input"
```

See the [Form](https://pac.chandresh.dev/docs/form) docs for the full pattern.
