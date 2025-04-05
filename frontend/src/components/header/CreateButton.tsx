import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function CreateButton() {
  return (
    <Button asChild>
      <Link
        to="/create"
        className="bg-purple-600 hover:bg-purple-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create new
      </Link>
    </Button>
  )
}