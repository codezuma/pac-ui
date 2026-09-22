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
import { PhoneInput } from "@/components/ui/phone-input"

function FormPhoneNumber<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  disabled,
  formItemClassName,
  ...props
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  name: TName
  description?: string
  formItemClassName?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          {...props}
          className={cn(formItemClassName)}
          data-invalid={fieldState.invalid}
        >
          {label && <FieldLabel>{label}</FieldLabel>}
          <FieldContent>
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              className="w-full"
              placeholder={placeholder}
              disabled={disabled}
            />
          </FieldContent>
          <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
        </Field>
      )}
    />
  )
}

export { FormPhoneNumber }
