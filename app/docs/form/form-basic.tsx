"use client"

import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
import { FormPassword } from "@/components/form/form-password"
import { FormProvider } from "@/components/form/form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const loginFormSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export function FormBasic() {
  const [submitted, setSubmitted] = useState<LoginFormValues | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (values: LoginFormValues) => {
    setSubmitted(values)
  }

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormInput
        control={form.control}
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        Icon={<Mail className="size-4" />}
      />
      <FormPassword
        control={form.control}
        name="password"
        label="Password"
        placeholder="Enter your password"
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Sign in
      </Button>
      {submitted && (
        <p className="text-muted-foreground text-sm">
          Submitted as <span className="text-foreground">{submitted.email}</span>
        </p>
      )}
    </FormProvider>
  )
}
