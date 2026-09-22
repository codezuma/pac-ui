"use client"

import { Button } from "@/components/ui/button"
import { FormPassword } from "@/components/form/form-password"
import { FormProvider } from "@/components/form/form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const passwordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type PasswordValues = z.infer<typeof passwordSchema>

export function FormPasswordBasic() {
  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "" },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormPassword
        control={form.control}
        name="password"
        label="Password"
        description="Must be at least 8 characters."
        Icon={<Lock className="size-4" />}
      />
      <Button type="submit">Continue</Button>
    </FormProvider>
  )
}
