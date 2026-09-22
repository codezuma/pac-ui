import { codeToHtmlDual } from "@/lib/shiki"
import { ClientCodeWrapper } from "./client-code-wrapper"

type DocCodeBlockProps = {
  language: string
  code: string
  filePath?: string
} & React.HTMLAttributes<HTMLDivElement>

export async function DocCodeBlock({
  language,
  code,
  ...props
}: DocCodeBlockProps) {
  const html = await codeToHtmlDual({ code, lang: language })

  return (
    <ClientCodeWrapper code={code}>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="not-prose overflow-auto rounded-md border border-border p-4 text-[13px] [&_pre]:m-0 [&_pre]:bg-background"
        {...props}
      />
    </ClientCodeWrapper>
  )
}
