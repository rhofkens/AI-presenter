import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  className?: string
}

export const BreadcrumbNav = ({ items, className }: BreadcrumbNavProps) => {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
          )}
          <Link
            to={item.href}
            className={`hover:text-foreground ${
              index === items.length - 1
                ? "font-semibold text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  )
}