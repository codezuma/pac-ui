"use client"

import { type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { Controller } from "react-hook-form"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  description,
  label,
  className,
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  name: TName
  description?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          className="flex flex-row items-center justify-between rounded-lg border p-4"
          data-invalid={fieldState.invalid}
        >
          <div className="space-y-0.5">
            {label && <FieldLabel>{label}</FieldLabel>}
            {description && <FieldDescription>{description}</FieldDescription>}
          </div>
          <FieldContent>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className={className}
            />
          </FieldContent>
          <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
        </Field>
      )}
    />
  )
}

export { FormSwitch }
