"use client"

import type React from "react"

import { File, FileArchive, FileText, ImageIcon, Upload, X } from "lucide-react"
import { useRef, useState } from "react"
import {
  type PathValue,
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Controller } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"

// Helper function to get appropriate icon based on file type
const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()

  if (!extension) return <File className="h-4 w-4 text-muted-foreground" />

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
    return <ImageIcon className="h-4 w-4 text-blue-500" />
  }

  if (["pdf", "doc", "docx", "txt", "rtf"].includes(extension)) {
    return <FileText className="h-4 w-4 text-red-500" />
  }

  if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
    return <FileArchive className="h-4 w-4 text-amber-500" />
  }

  return <File className="h-4 w-4 text-muted-foreground" />
}

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  )
}

function FormFileInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  description,
  className,
  label,
  accept,
  multiple = false,
  ...props
}: {
  label?: string
  control: Control<TFieldValues>
  className?: string
  name: TName
  description?: string
  accept?: string
  multiple?: boolean
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange"
>) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setValue } = useFormContext<TFieldValues>()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...fieldProps }, fieldState }) => {
        // Handle files as an array internally for consistency
        const files = value as File | File[] | null

        const handleFileChange = (newFiles: FileList | null) => {
          if (!newFiles || newFiles.length === 0) {
            onChange(null)
            return
          }
          setValue(
            name,
            multiple
              ? (Array.from(newFiles) as PathValue<TFieldValues, TName>)
              : (newFiles[0] as PathValue<TFieldValues, TName>)
          )
          onChange(multiple ? Array.from(newFiles) : newFiles[0])
        }

        const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(true)
        }

        const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(false)
        }

        const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(false)

          const droppedFiles = e.dataTransfer.files
          handleFileChange(droppedFiles)
        }

        const handleButtonClick = () => {
          fileInputRef.current?.click()
        }

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          handleFileChange(e.target.files)
        }

        const removeFile = (index: number) => {
          if (!files) return

          if (multiple) {
            const newFiles = [...(files as File[])]
            newFiles.splice(index, 1)
            onChange(newFiles.length > 0 ? newFiles : null)
          } else {
            onChange(null)
          }
        }

        const removeAllFiles = () => {
          onChange(null)
        }

        return (
          <Field className={className} data-invalid={fieldState.invalid}>
            {label && <FieldLabel>{label}</FieldLabel>}
            <FieldContent>
              <div className="space-y-2">
                <div
                  className={cn(
                    "rounded-lg border-2 border-dashed transition-all duration-200",
                    "flex flex-col items-center justify-center",
                    isDragging
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted/30",
                    files && (files as File[]).length > 0
                      ? "bg-muted/20 p-4"
                      : "p-8"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    {...props}
                    {...fieldProps}
                    type="file"
                    className="sr-only"
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    accept={accept}
                    multiple={multiple}
                  />

                  {!files || (files as File[]).length === 0 ? (
                    <>
                      <Upload className="text-muted-foreground/70 mb-2 h-12 w-12" />
                      <div className="space-y-2 text-center">
                        <p className="text-foreground text-sm font-medium">
                          Drag & drop your file{multiple ? "s" : ""} here
                        </p>
                        <p className="text-muted-foreground text-xs">or</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={handleButtonClick}
                        >
                          Browse files
                        </Button>
                      </div>
                      {accept && (
                        <p className="text-muted-foreground mt-4 text-xs">
                          Accepted formats:{" "}
                          {accept.replace(/\./g, " ").replace(/,/g, ", ")}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="w-full">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm font-medium">
                          {multiple
                            ? `${(files as File[]).length} file${
                                (files as File[]).length !== 1 ? "s" : ""
                              } selected`
                            : "File selected"}
                        </p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeAllFiles}
                          className="hover:bg-destructive/10 hover:text-destructive h-7 px-2 text-xs"
                        >
                          <X className="mr-1 h-3.5 w-3.5" />
                          {multiple ? "Remove all" : "Remove"}
                        </Button>
                      </div>

                      <ul className="max-h-48 space-y-2 overflow-y-auto pr-1">
                        {Array.isArray(files) ? (
                          files.map((file, index) => (
                            <li
                              key={`${file.name}-${index}`}
                              className="bg-background group relative flex items-center justify-between rounded-md border p-2.5 text-sm"
                            >
                              <div className="flex max-w-[calc(100%-40px)] items-center space-x-2 truncate">
                                {getFileIcon(file.name)}
                                <div className="truncate">
                                  <p className="truncate font-medium">
                                    {file.name}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="hover:bg-destructive/10 hover:text-destructive absolute right-2 h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <X className="h-3.5 w-3.5" />
                                <span className="sr-only">
                                  Remove {file.name}
                                </span>
                              </Button>
                            </li>
                          ))
                        ) : files ? (
                          <li className="bg-background group relative flex items-center justify-between rounded-md border p-2.5 text-sm">
                            <div className="flex max-w-[calc(100%-40px)] items-center space-x-2 truncate">
                              {getFileIcon(files.name)}
                              <div className="truncate">
                                <p className="truncate font-medium">
                                  {files.name}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {formatFileSize(files.size)}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeAllFiles}
                              className="hover:bg-destructive/10 hover:text-destructive absolute right-2 h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="h-3.5 w-3.5" />
                              <span className="sr-only">
                                Remove {files.name}
                              </span>
                            </Button>
                          </li>
                        ) : null}
                      </ul>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground mt-3 text-xs"
                        onClick={handleButtonClick}
                      >
                        Add a different file
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </FieldContent>
            {description && <FieldDescription>{description}</FieldDescription>}
            <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
          </Field>
        )
      }}
    />
  )
}

export { FormFileInput }
