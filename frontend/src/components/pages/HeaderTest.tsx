import { UserMenu } from "../header/UserMenu"
import { BreadcrumbNav } from "../header/BreadcrumbNav"

export const HeaderTest = () => {
  const breadcrumbItems = [
    { label: "Projects", href: "/projects" },
    { label: "Marketing Campaign", href: "/projects/marketing" },
    { label: "Q2 Strategy", href: "/projects/marketing/q2" },
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Header Components Test</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Breadcrumb Navigation</h2>
          <BreadcrumbNav items={breadcrumbItems} />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">User Menu</h2>
          <UserMenu />
        </div>

        <div className="mt-12 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Header Layout Example</h2>
          <div className="flex items-center justify-between w-full bg-background p-4 border rounded-lg">
            <BreadcrumbNav items={breadcrumbItems} />
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  )
}