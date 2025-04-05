import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none hover:opacity-90">
        <Avatar className="h-8 w-8 ring-2 ring-white">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>DH</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium text-gray-700">David Hofkens</span>
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="py-2">
          <span className="text-sm">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-2 text-red-600">
          <span className="text-sm">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}