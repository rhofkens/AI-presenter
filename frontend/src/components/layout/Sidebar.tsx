import { Home, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';

export function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm h-screen fixed left-0 top-0 z-20 flex flex-col">
      <div className="border-b border-gray-200">
        <Logo />
      </div>
      <div className="pt-6">
        <nav className="px-4 space-y-1">
          <Link
            to="/"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg bg-gray-100"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center space-x-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}