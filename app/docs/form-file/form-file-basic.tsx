"use client"

import { Button } from "@/components/ui/button"
import { FormFileInput } from "@/components/form/form-file"
import { FormProvider } from "@/components/form/form-provider"
import { useForm } from "react-hook-form"

type ResumeValues = {
  resume: File | File[] | null
}

export function FormFileBasic() {
  const form = useForm<ResumeValues>({
    defaultValues: { resume: null },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormFileInput
        control={form.control}
        name="resume"
        label="Resume"
        accept=".pdf,.doc,.docx"
        description="PDF or Word documents only."
      />
      <Button type="submit">Upload</Button>
    </FormProvider>
  )
}
