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
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
} from "@/components/ui/number-field"
import {
  InputGroup,
  InputGroupAddon,
} from "@/components/ui/input-group"

function FormNumberField<
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
  showButtons = true,
  min,
  max,
  step,
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
  showButtons?: boolean
  min?: number
  max?: number
  step?: number | string
} & Omit<React.ComponentProps<typeof NumberField>, "value" | "onChange" | "onBlur">) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // Convert value to number, handle empty/undefined
        const value =
          field.value === undefined || field.value === null
            ? undefined
            : Number(field.value)

        return (
          <Field className={className} data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel className="flex items-center gap-1">
                {label.replace(/\s*\*$/, "")}
                {label.includes("*") && (
                  <span className="text-destructive">*</span>
                )}
              </FieldLabel>
            )}
            <FieldContent>
              {Icon ? (
                <InputGroup aria-invalid={!!fieldState.error}>
                  <InputGroupAddon
                    align="inline-start"
                    aria-invalid={!!fieldState.error}
                  >
                    <span className={fieldState.error ? "text-destructive" : ""}>
                      {Icon}
                    </span>
                  </InputGroupAddon>
                  <NumberField
                    {...props}
                    value={value}
                    onValueChange={(newValue) => {
                      if (newValue === undefined || newValue === null) {
                        field.onChange(undefined)
                      } else {
                        const num = Number(newValue)
                        if (!isNaN(num)) {
                          field.onChange(num)
                        }
                      }
                    }}
                    onBlur={field.onBlur}
                    min={min}
                    max={max}
                    step={step}
                    aria-invalid={!!fieldState.error}
                    className={inputClassName}
                  >
                    <NumberFieldGroup>
                      <NumberFieldInput className={inputClassName} />
                      {showButtons && <NumberFieldDecrement />}
                      {showButtons && <NumberFieldIncrement />}
                    </NumberFieldGroup>
                  </NumberField>
                  {children}
                </InputGroup>
              ) : (
                <NumberField
                  {...props}
                  value={value}
                  onValueChange={(newValue) => {
                    if (newValue === undefined || newValue === null) {
                      field.onChange(undefined)
                    } else {
                      const num = Number(newValue)
                      if (!isNaN(num)) {
                        field.onChange(num)
                      }
                    }
                  }}
                  onBlur={field.onBlur}
                  min={min}
                  max={max}
                  step={step}
                  aria-invalid={!!fieldState.error}
                  className={inputClassName}
                >
                  <NumberFieldGroup>
                    {showButtons && <NumberFieldDecrement />}
                    <NumberFieldInput className={inputClassName} />
                    {showButtons && <NumberFieldIncrement />}
                  </NumberFieldGroup>
                </NumberField>
              )}
            </FieldContent>
            {description && <FieldDescription>{description}</FieldDescription>}
            <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
          </Field>
        )
      }}
    />
  )
}

export { FormNumberField }
