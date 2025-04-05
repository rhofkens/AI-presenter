import { UserMenu } from './UserMenu';
import { BreadcrumbNav } from './BreadcrumbNav';

interface PageHeaderProps {
  title: string;
  breadcrumbItems?: Array<{ label: string; href: string; }>;
}

export function PageHeader({ title, breadcrumbItems }: PageHeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-64 bg-white h-16 z-10">
      <div className="h-full border-b border-gray-200 px-8 flex items-center justify-between">
        <div className="flex flex-col justify-center">
          <BreadcrumbNav
            items={breadcrumbItems || [{ label: title, href: '#' }]}
            className="text-sm text-muted-foreground"
          />
        </div>
        <UserMenu />
      </div>
    </header>
  );
}