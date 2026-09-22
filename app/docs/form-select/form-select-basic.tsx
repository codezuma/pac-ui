"use client"

import { Button } from "@/components/ui/button"
import { FormProvider } from "@/components/form/form-provider"
import { FormSelect } from "@/components/form/form-select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const roleSchema = z.object({
  role: z.string().min(1, "Please select a role"),
})

type RoleValues = z.infer<typeof roleSchema>

export function FormSelectBasic() {
  const form = useForm<RoleValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: { role: "" },
  })

  return (
    <FormProvider
      methods={form}
      onSubmit={form.handleSubmit(() => {})}
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <FormSelect
        control={form.control}
        name="role"
        label="Role"
        placeholder="Select a role"
        options={[
          { value: "viewer", label: "Viewer" },
          { value: "editor", label: "Editor" },
          { value: "admin", label: "Admin" },
        ]}
      />
      <Button type="submit">Save</Button>
    </FormProvider>
  )
}
