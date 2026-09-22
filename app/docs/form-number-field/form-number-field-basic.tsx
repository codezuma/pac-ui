"use client"

import { Button } from "@/components/ui/button"
import { FormNumberField } from "@/components/form/form-number-field"
import { FormProvider } from "@/components/form/form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const quantitySchema = z.object({
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(10, "Quantity must be at most 10"),
})

type QuantityValues = z.infer<typeof quantitySchema>

export function FormNumberFieldBasic() {
  const form = useForm<QuantityValues>({
    resolver: zodResolver(quantitySchema),
    defaultValues: { quantity: 1 },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormNumberField
        control={form.control}
        name="quantity"
        label="Quantity"
        min={1}
        max={10}
        step={1}
      />
      <Button type="submit">Add to cart</Button>
    </FormProvider>
  )
}
