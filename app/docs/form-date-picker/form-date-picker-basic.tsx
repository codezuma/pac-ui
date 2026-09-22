"use client"

import { Button } from "@/components/ui/button"
import { FormDatePicker } from "@/components/form/form-date-picker"
import { FormProvider } from "@/components/form/form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const eventSchema = z.object({
  date: z.string().min(1, "Please pick a date"),
})

type EventValues = z.infer<typeof eventSchema>

export function FormDatePickerBasic() {
  const form = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: { date: "" },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormDatePicker
        control={form.control}
        name="date"
        label="Event date"
        placeholder="YYYY-MM-DD"
      />
      <Button type="submit">Save</Button>
    </FormProvider>
  )
}
