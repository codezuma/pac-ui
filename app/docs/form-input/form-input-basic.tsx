"use client"

import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
import { FormProvider } from "@/components/form/form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const profileSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
})

type ProfileValues = z.infer<typeof profileSchema>

export function FormInputBasic() {
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { username: "" },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormInput
        control={form.control}
        name="username"
        label="Username *"
        placeholder="your-username"
        description="This is your public display name."
        Icon={<User className="size-4" />}
      />
      <Button type="submit">Save</Button>
    </FormProvider>
  )
}
