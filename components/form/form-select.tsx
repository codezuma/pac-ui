"use client"

import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { Controller } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  label?: string
  required?: boolean
  icon?: React.ReactNode
  control: Control<TFieldValues>
  name: TName
  placeholder?: string
  options: { value: string; label: React.ReactNode }[]
  className?: string
  disabled?: boolean
  formItemClassName?: string
}

function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  options,
  className,
  disabled,
  icon,
  required,
  formItemClassName,
}: FormSelectProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          className={cn("space-y-2", formItemClassName)}
          data-invalid={fieldState.invalid}
        >
          {label && (
            <FieldLabel
              htmlFor={name}
              className="flex items-center gap-2 text-sm font-semibold"
            >
              {icon}
              {label} {required && <span className="text-destructive">*</span>}
            </FieldLabel>
          )}

          <FieldContent>
            <Select
              disabled={disabled}
              onValueChange={(value) => field.onChange(value)}
              value={field.value || ""}
            >
              <SelectTrigger
                className={cn(
                  "h-11! w-full text-sm",
                  fieldState.error &&
                    "border-destructive! focus-visible:ring-destructive!",
                  className
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent className="w-(--anchor-width)">
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>

          <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
        </Field>
      )}
    />
  )
}

export { FormSelect }
