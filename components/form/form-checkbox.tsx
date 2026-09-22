"use client"

import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { Controller } from "react-hook-form"

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  className,
  disabled,
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  children?: React.ReactNode
  Icon?: React.ReactNode
  name: TName
  description?: string
  disabled?: boolean
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          className={cn("flex flex-row items-center space-y-0 space-x-3", className)}
          data-invalid={fieldState.invalid}
        >
          <FieldContent>
            <Checkbox
              disabled={disabled}
              checked={!!field.value}
              onCheckedChange={field.onChange}
            />
          </FieldContent>
          {label && <FieldLabel>{label}</FieldLabel>}
          <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
        </Field>
      )}
    />
  )
}

export { FormCheckbox }
