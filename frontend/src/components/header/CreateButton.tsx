import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CreateButton() {
  return (
    <Button 
      className="bg-purple-600 hover:bg-purple-700"
      onClick={() => {}}
    >
      <Plus className="mr-2 h-4 w-4" />
      Create new
    </Button>
  )
}