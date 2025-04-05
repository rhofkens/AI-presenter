import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function WorkspaceSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none hover:opacity-80">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://github.com/shadcn.png" alt="Workspace avatar" />
          <AvatarFallback>D</AvatarFallback>
        </Avatar>
        <div className="text-left">
          <p className="text-lg font-semibold text-gray-900">David's workspace</p>
        </div>
        <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuItem>Switch workspace</DropdownMenuItem>
        <DropdownMenuItem>Create workspace</DropdownMenuItem>
        <DropdownMenuItem>Workspace settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}