"use client"

import {
  type Control,
  type FieldArrayPath,
  type FieldPath,
  type FieldValues,
  useFieldArray,
  useFormState,
} from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

function FormArrayField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  description,
  label,
  className,
  placeholder = "Enter item",
  addButtonLabel = "Add Item",
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  name: TName
  description?: string
  placeholder?: string
  addButtonLabel?: string
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as unknown as FieldArrayPath<TFieldValues>,
  })

  const { errors } = useFormState({ control })
  const fieldError = errors[name as string]

  return (
    <Field className={className} data-invalid={!!fieldError}>
      {label && (
        <FieldLabel className="flex items-center gap-1">
          {label.replace(/\s*\*$/, "")}
          {label.includes("*") && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <FieldContent>
        <div className="space-y-2">
          {fields.length === 0 ? (
            <p className="text-muted-foreground text-sm">No items added yet</p>
          ) : (
            fields.map((field, index) => {
              const itemError =
                fieldError && Array.isArray(fieldError) ? fieldError[index] : undefined
              return (
                <div key={field.id} className="flex items-start gap-2">
                  <div className="flex-1">
                    <Input
                      {...control.register(
                        `${name}.${index}` as FieldPath<TFieldValues>
                      )}
                      placeholder={placeholder}
                      className="w-full"
                      aria-invalid={!!itemError}
                    />
                    {itemError && (
                      <p className="text-destructive mt-1 text-sm">
                        {typeof itemError === "object" && itemError?.message
                          ? String(itemError.message)
                          : "Invalid value"}
                      </p>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive h-9 w-9 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )
            })
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append("" as never)}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            {addButtonLabel}
          </Button>
        </div>
      </FieldContent>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError
        errors={
          fieldError ? [fieldError as { message?: string }] : undefined
        }
      />
    </Field>
  )
}

export { FormArrayField }
