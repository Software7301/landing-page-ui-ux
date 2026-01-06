import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-12 w-full min-w-0 rounded-lg border px-4 py-3 text-base shadow-sm transition-all duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:ring-[3px] focus-visible:shadow-md",
        className
      )}
      style={{
        backgroundColor: "var(--color-input-bg)",
        borderColor: "var(--color-input-border)",
        color: "var(--color-text)",
        "--tw-ring-color": "var(--color-primary)",
        "--tw-shadow-color": "var(--color-primary)",
      } as React.CSSProperties}
      {...props}
    />
  )
}

export { Input }

