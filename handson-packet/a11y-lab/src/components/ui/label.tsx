"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// shadcn/ui "label" — added by `npx shadcn@latest add label`; pre-installed here.
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
