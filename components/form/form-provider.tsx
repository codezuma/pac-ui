"use client"

import { cn } from "@/lib/utils"
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from "react"
import {
  FormProvider as Form,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form"

type Props<T extends FieldValues> = {
  children: ReactNode
  methods: UseFormReturn<T>
  className?: string
  onSubmit: () => void
}

// forwardRef doesn't support generics, so the exported component is typed
// generically below via a cast; this internal signature stays untyped.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormProvider = forwardRef<HTMLFormElement, Props<any>>(
  ({ children, onSubmit, className, methods }, ref) => {
    const formRef = useRef<HTMLFormElement>(null)

    useImperativeHandle(ref, () => formRef.current!)

    return (
      <Form {...methods}>
        <form
          ref={formRef}
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(className)}
        >
          {children}
        </form>
      </Form>
    )
  }
)

FormProvider.displayName = "FormProvider"

export { FormProvider }
