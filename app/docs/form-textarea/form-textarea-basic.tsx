"use client"

import { Button } from "@/components/ui/button"
import { FormProvider } from "@/components/form/form-provider"
import { FormTextarea } from "@/components/form/form-textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const bioSchema = z.object({
  bio: z.string().max(280, "Bio must be at most 280 characters"),
})

type BioValues = z.infer<typeof bioSchema>

export function FormTextareaBasic() {
  const form = useForm<BioValues>({
    resolver: zodResolver(bioSchema),
    defaultValues: { bio: "" },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormTextarea
        control={form.control}
        name="bio"
        label="Bio"
        placeholder="Tell us a bit about yourself"
        description="Max 280 characters."
      />
      <Button type="submit">Save</Button>
    </FormProvider>
  )
}
