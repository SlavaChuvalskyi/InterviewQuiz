import * as React from "react"

import { cn } from "@/lib/utils"

function Grid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "grid bg-grid text-card-foreground gap-6 rounded-xl py-6",
        className
      )}
      {...props}
    />
  )
}

export {
  Grid
}
