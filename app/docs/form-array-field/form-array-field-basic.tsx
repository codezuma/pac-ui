"use client"

import { Button } from "@/components/ui/button"
import { FormArrayField } from "@/components/form/form-array-field"
import { FormProvider } from "@/components/form/form-provider"
import { useForm } from "react-hook-form"

type InviteValues = {
  emails: string[]
}

export function FormArrayFieldBasic() {
  const form = useForm<InviteValues>({
    defaultValues: { emails: [] },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormArrayField
        control={form.control}
        name="emails"
        label="Invite teammates"
        placeholder="teammate@example.com"
        addButtonLabel="Add email"
        description="Add one email per teammate you want to invite."
      />
      <Button type="submit">Send invites</Button>
    </FormProvider>
  )
}
