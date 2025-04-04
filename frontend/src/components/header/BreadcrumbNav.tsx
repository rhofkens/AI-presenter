import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  return (
    <nav className="flex items-center space-x-1 text-sm">
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