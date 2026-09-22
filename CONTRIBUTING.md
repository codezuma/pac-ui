# Contributing

Thank you for your interest in contributing to Pac UI. Whether you are fixing a bug, adding a new field component, or improving documentation, your contributions are valuable.

## 1. Types of Contributions

### Form components

- What: Type-safe form field components (e.g., inputs, selects, date pickers), bound to react-hook-form via Controller with Zod validation.
- Details: Purely UI, no backend logic.
- Examples: Check `/components/form` for existing field components, and `/scripts/registry-components.ts` for how they're registered.

### Documentation

- What: Usage docs and examples for each field component.
- Examples: See `/app/docs/*/page.mdx`.

## 2. Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (or your preferred package manager)
- Familiarity with React, TypeScript, react-hook-form, and Zod.

### Setting Up the Project

1. Fork the repository on GitHub.
2. Clone your fork: `git clone https://github.com/codezuma/pac-ui.git`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

### Folder Structure

- `/components/form`: Form field components
- `/components/ui`: Shared shadcn/ui primitives used by the field components
- `/app/docs`: Documentation pages
- `/scripts/registry-components.ts`: Registers each component for the shadcn CLI installer

## 3. How to Contribute

1. Pick a field component or doc page to add or improve.
2. Check existing components in `/components/form` as a reference for structure and conventions.
3. Follow Coding Standards:

- Use TypeScript for type safety.
- Follow the existing code style (e.g., Prettier, ESLint).
- Write clear, concise documentation for your code.

4. Test Your Changes:

- Ensure your component works locally with `npm run dev`.
- Add or update the corresponding docs page under `/app/docs`.

5. Submit a Pull Request:

- Fork the repo and create a branch: `git checkout -b feature/your-feature-name`
- Commit your changes with clear messages: `git commit -m "Add new form component"`
- Push to your fork: `git push origin feature/your-feature-name`
- Open a PR with a clear title and description, including:
  - What you added/changed.
  - A minimal demo preview (e.g., screenshot or short video).
  - Any relevant issue numbers (if applicable).

## 4. Need Help?

Have an idea, feature request, or need assistance? Open a GitHub issue for questions or suggestions.

We are here to support you and make contributing a smooth experience.
