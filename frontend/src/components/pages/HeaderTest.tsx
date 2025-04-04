import React from "react"
import { BreadcrumbNav } from "@/components/header/BreadcrumbNav"
import { UserMenu } from "@/components/header/UserMenu"

export const HeaderTest = () => {
  const breadcrumbItems = [
    { label: "Projects", href: "/projects" },
    { label: "Marketing Campaign", href: "/projects/marketing" },
    { label: "Q2 Strategy", href: "/projects/marketing/q2" },
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8 bg-background p-4 rounded-lg shadow">
        <BreadcrumbNav items={breadcrumbItems} />
        <UserMenu />
      </div>
      <div className="text-sm text-muted-foreground">
        Test page for header components
      </div>
    </div>
  )
}