import { Link } from "react-router-dom"
import { Video } from "lucide-react"

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-6 h-16 hover:opacity-80">
      <Video className="h-6 w-6 text-purple-600" />
      <span className="font-semibold text-lg text-gray-900">PPT2Video</span>
    </Link>
  )
}