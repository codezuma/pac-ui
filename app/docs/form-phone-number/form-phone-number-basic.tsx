"use client"

import { Button } from "@/components/ui/button"
import { FormPhoneNumber } from "@/components/form/form-phone-number"
import { FormProvider } from "@/components/form/form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const contactSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
})

type ContactValues = z.infer<typeof contactSchema>

export function FormPhoneNumberBasic() {
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { phone: "" },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormPhoneNumber
        control={form.control}
        name="phone"
        label="Phone number"
        placeholder="Enter phone number"
      />
      <Button type="submit">Save</Button>
    </FormProvider>
  )
}
