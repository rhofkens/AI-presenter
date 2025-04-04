import { WorkspaceSelector } from "./WorkspaceSelector"
import { SortDropdown } from "./SortDropdown"

export function SubHeader() {
  return (
    <div className="w-full bg-gray-50 border-y border-gray-200">
      <div className="px-6 h-14 flex items-center justify-between">
        <WorkspaceSelector />
        <SortDropdown />
      </div>
    </div>
  )
}