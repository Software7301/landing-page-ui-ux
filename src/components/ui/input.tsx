import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-[#141026] border-[rgba(109,40,217,0.2)] h-12 w-full min-w-0 rounded-lg border px-4 py-3 text-base text-[#F5F3FF] shadow-sm transition-all duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-[#6D28D9] focus-visible:ring-[#6D28D9]/30 focus-visible:ring-[3px] focus-visible:shadow-md focus-visible:shadow-[#6D28D9]/10",
        "aria-invalid:ring-[#6D28D9]/30 aria-invalid:border-[#6D28D9]",
        className
      )}
      {...props}
    />
  )
}

export { Input }

