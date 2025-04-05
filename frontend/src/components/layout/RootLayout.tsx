import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Main content area with padding for sidebar */}
      <div className="pl-64">
        {/* Main content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
