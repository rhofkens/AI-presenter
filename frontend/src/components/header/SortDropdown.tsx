import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SortDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <span className="text-gray-400">Sort by:</span>
        <span>Date</span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="text-sm">Date</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Name</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">Status</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}