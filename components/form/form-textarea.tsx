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
  InputGroupTextarea,
  InputGroupAddon,
} from "@/components/ui/input-group"

function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  description,
  textareaClassName,
  children,
  label,
  className,
  Icon,
  ...props
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  textareaClassName?: string
  children?: React.ReactNode
  Icon?: React.ReactNode
  name: TName
  description?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
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
            <InputGroup aria-invalid={!!fieldState.error}>
              {Icon && (
                <InputGroupAddon
                  align="block-start"
                  aria-invalid={!!fieldState.error}
                >
                  <span className={fieldState.error ? "text-destructive" : ""}>
                    {Icon}
                  </span>
                </InputGroupAddon>
              )}
              <InputGroupTextarea
                aria-invalid={!!fieldState.error}
                className={textareaClassName}
                {...props}
                {...field}
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

export { FormTextarea }
