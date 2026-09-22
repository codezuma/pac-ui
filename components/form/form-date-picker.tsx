"use client"

import type React from "react"
import { Calendar } from "@/components/ui/calendar"
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
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import type { Control, FieldPath, FieldValues } from "react-hook-form"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"

function FormDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  description,
  fromDate,
  toDate,
  label,
  className,
  placeholder,
  inputClassName,
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  name: TName
  description?: string
  fromDate?: Date
  toDate?: Date
  inputClassName?: string
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [open, setOpen] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={className} data-invalid={fieldState.invalid}>
          {label && <FieldLabel>{label}</FieldLabel>}
          <FieldContent>
            <Popover open={open} onOpenChange={setOpen}>
              <InputGroup
                aria-invalid={!!fieldState.error}
                className={cn(
                  "text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <InputGroupInput
                  type="date"
                  className={inputClassName}
                  onPaste={(e) => {
                    e.preventDefault()
                    const pastedText = e.clipboardData.getData("text/plain")

                    // Try to parse the date with different formats
                    // First try dd-mm-yyyy (with hyphens)
                    let parsedDate = dayjs(pastedText, "DD-MM-YYYY")

                    // If not valid, try dd/mm/yyyy (with slashes)
                    if (!parsedDate.isValid()) {
                      parsedDate = dayjs(pastedText, "DD/MM/YYYY")
                    }

                    // If we have a valid date, update the field
                    if (parsedDate.isValid()) {
                      // Convert to YYYY-MM-DD format for the date input
                      const formattedDate = parsedDate.format("YYYY-MM-DD")
                      field.onChange(formattedDate)

                      // Optional: Show a visual feedback that paste worked
                      const inputEl = e.currentTarget as HTMLInputElement
                      inputEl.blur()
                      setTimeout(() => inputEl.focus(), 10)
                    }
                  }}
                  placeholder={placeholder}
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
                <PopoverTrigger
                  render={
                    <InputGroupButton variant="ghost" size="xs" type="button">
                      <CalendarIcon className="size-6!" />
                    </InputGroupButton>
                  }
                />
              </InputGroup>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    // Convert Date to string in YYYY-MM-DD format
                    if (date) {
                      field.onChange(dayjs(date).format("YYYY-MM-DD"))
                      setOpen(false) // Close the popover after selection
                    }
                  }}
                  disabled={(date) => {
                    if (fromDate && date < fromDate) {
                      return true
                    }
                    if (toDate && date > toDate) {
                      return true
                    }
                    return false
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FieldContent>
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
        </Field>
      )}
    />
  )
}

export { FormDatePicker }
