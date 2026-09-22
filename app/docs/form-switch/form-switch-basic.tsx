"use client"

import { Button } from "@/components/ui/button"
import { FormProvider } from "@/components/form/form-provider"
import { FormSwitch } from "@/components/form/form-switch"
import { useForm } from "react-hook-form"

type NotificationValues = {
  notifications: boolean
}

export function FormSwitchBasic() {
  const form = useForm<NotificationValues>({
    defaultValues: { notifications: true },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormSwitch
        control={form.control}
        name="notifications"
        label="Email notifications"
        description="Receive updates about your account activity."
      />
      <Button type="submit">Save</Button>
    </FormProvider>
  )
}
