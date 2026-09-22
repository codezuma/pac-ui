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
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group"

function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  description,
  inputClassName,
  children,
  label,
  className,
  Icon,
  ...props
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  inputClassName?: string
  children?: React.ReactNode
  Icon?: React.ReactNode
  name: TName
  description?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={className} data-invalid={fieldState.invalid}>
          {label && <FieldLabel>{label}</FieldLabel>}
          <FieldContent>
            <InputGroup aria-invalid={!!fieldState.error}>
              {Icon && (
                <InputGroupAddon
                  align="inline-start"
                  aria-invalid={!!fieldState.error}
                >
                  <span className={fieldState.error ? "text-destructive" : ""}>
                    {Icon}
                  </span>
                </InputGroupAddon>
              )}
              <InputGroupInput
                {...props}
                {...field}
                aria-invalid={!!fieldState.error}
                className={inputClassName}
              />
              {children}
            </InputGroup>
          </FieldContent>
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
        </Field>
      )}
    />
  )
}

export { FormInput }
