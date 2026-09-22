"use client"

import type { Control, FieldPath, FieldValues } from "react-hook-form"
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
  InputGroupButton,
  InputGroupAddon,
} from "@/components/ui/input-group"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

function FormPassword<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  description,
  label,
  className,
  inputClassName,
  Icon,
  ...props
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  Icon?: React.ReactNode
  name: TName
  description?: string
  inputClassName?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [inputType, setInputType] = useState<"password" | "text">("password")

  const toggleType = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"))
  }

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
                type={inputType}
                className={inputClassName}
              />
              <InputGroupButton
                onClick={toggleType}
                type="button"
                variant="ghost"
                size="xs"
              >
                {inputType === "text" ? (
                  <Eye className="text-muted-foreground size-5" />
                ) : (
                  <EyeOff className="text-muted-foreground size-5" />
                )}
              </InputGroupButton>
            </InputGroup>
          </FieldContent>
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
        </Field>
      )}
    />
  )
}

export { FormPassword }
