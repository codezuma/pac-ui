import { DocCodeBlock } from "@/components/app/doc-code-block"
import { Github } from "lucide-react"
import Link from "next/link"

const CODE_SAMPLE = `const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
})

<FormProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
  <FormInput control={form.control} name="email" label="Email" />
  <FormPassword control={form.control} name="password" label="Password" />
</FormProvider>`

export default function Home() {
  return (
    <>
      <div className="mb-16 flex flex-col items-start">
        <div className="mb-5 flex flex-col gap-1 text-pretty">
          <p className="text-foreground text-3xl font-[450] tracking-tight">
            Forms that stay out of your way.
          </p>
          <p className="text-muted-foreground text-3xl font-[450] tracking-tight">
            Type-safe, validated form components for React, built on
            react-hook-form and Zod.
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Link
            href="/docs/introduction"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-10 items-center justify-center rounded-full px-4 text-base transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/codezuma/pac-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="border-border bg-background text-foreground hover:bg-background/90 inline-flex h-10 items-center justify-center rounded-full border px-4 text-base transition-colors"
          >
            <Github className="mr-2 size-4" /> Star on GitHub
          </Link>
        </div>
      </div>

      <div className="mb-16 flex flex-col gap-4">
        <h2 className="text-foreground text-xl font-medium">Why Pac UI</h2>
        <div className="text-muted-foreground flex max-w-2xl flex-col gap-4 text-base leading-relaxed">
          <p>
            I kept rebuilding the same forms across every admin panel and
            dashboard I shipped: a text field here, a validation rule there,
            an error message wired up by hand each time. Eventually I found a
            pattern that made those pieces reusable — compact field
            components with validation baked in, composed through a separate
            provider layer so a deeply nested form never has to pass{" "}
            <code className="not-prose bg-secondary rounded p-1 font-mono text-sm">
              value
            </code>
            ,{" "}
            <code className="not-prose bg-secondary rounded p-1 font-mono text-sm">
              onChange
            </code>
            , and error props down by hand. Just pass a{" "}
            <code className="not-prose bg-secondary rounded p-1 font-mono text-sm">
              control
            </code>{" "}
            object, and everything downstream is type-safe. That pattern is
            this library.
          </p>
          <p>
            Pac UI takes a different angle from the ChatGPT-style component
            kits: it isn&apos;t chat-specific. Fields like phone number and
            date picker aren&apos;t things you&apos;d find in a chat UI kit —
            they&apos;re the fields real product forms actually need.
          </p>
          <p>
            Today the field components are built entirely on{" "}
            <Link
              href="https://react-hook-form.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              React Hook Form
            </Link>
            . Support for other form engines — Typeform-style flows among
            them — is on the roadmap, but the pattern stays the same either
            way: drop a{" "}
            <code className="not-prose bg-secondary rounded p-1 font-mono text-sm">
              FormProvider
            </code>{" "}
            at the root with the object <code className="not-prose bg-secondary rounded p-1 font-mono text-sm">useForm()</code> returns, and every field underneath reads its{" "}
            <code className="not-prose bg-secondary rounded p-1 font-mono text-sm">
              control
            </code>{" "}
            from there — fully typed against your schema. Validation, error
            colors, and ARIA attributes all just work.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-foreground mb-4 text-xl font-medium">
          The pattern
        </h2>
        <DocCodeBlock code={CODE_SAMPLE} language="tsx" />
      </div>

      <p className="text-muted-foreground mb-16 text-sm">
        Pac UI&apos;s layout and docs scaffolding grew out of{" "}
        <Link
          href="https://github.com/ibelick/prompt-kit"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          prompt-kit
        </Link>
        . See the{" "}
        <Link
          href="/docs/attribution"
          className="text-foreground underline underline-offset-4"
        >
          attribution page
        </Link>{" "}
        for the full story and our thanks.
      </p>
    </>
  )
}
