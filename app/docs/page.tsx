import IntroductionPage from "./introduction/page.mdx"
import { generateMetadata } from "./utils/metadata"

export const metadata = generateMetadata(
  "Documentation",
  "Documentation for Pac UI"
)

export default function Docs() {
  return <IntroductionPage />
}
