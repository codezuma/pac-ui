"use client"

import { Button } from "@/components/ui/button"
import { FormCheckbox } from "@/components/form/form-checkbox"
import { FormProvider } from "@/components/form/form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const termsSchema = z.object({
  acceptTerms: z.literal(true, {
    message: "You must accept the terms to continue",
  }),
})

type TermsValues = z.infer<typeof termsSchema>

export function FormCheckboxBasic() {
  const form = useForm<TermsValues>({
    resolver: zodResolver(termsSchema),
    defaultValues: { acceptTerms: false as unknown as true },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormCheckbox
        control={form.control}
        name="acceptTerms"
        label="I accept the terms and conditions"
      />
      <Button type="submit">Continue</Button>
    </FormProvider>
  )
}
