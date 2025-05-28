import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  PieChart, 
  Building2, 
  FileText, 
  Newspaper, 
  Settings, 
  HelpCircle, 
  LogOut,
  Briefcase
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive 
        ? 'bg-wayne-blue/10 text-wayne-blue font-medium' 
        : 'text-gray-400 hover:text-gray-100 hover:bg-midnight-100'
    }`;
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed top-0 left-0 bottom-0 bg-midnight-100 pt-16 overflow-y-auto">
      <div className="flex-1 px-3 py-4">
        <div className="mb-6 px-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Main</p>
        </div>

        <nav className="space-y-1">
          <NavLink to="/" className={navLinkClass}>
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/portfolio" className={navLinkClass}>
            <Briefcase className="h-5 w-5" />
            <span>Portfolio</span>
          </NavLink>
          <NavLink to="/market" className={navLinkClass}>
            <BarChart3 className="h-5 w-5" />
            <span>Market Data</span>
          </NavLink>
          <NavLink to="/enterprises" className={navLinkClass}>
            <Building2 className="h-5 w-5" />
            <span>Wayne Enterprises</span>
          </NavLink>
        </nav>

        <div className="mt-8 mb-4 px-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">Analysis</p>
        </div>

        <nav className="space-y-1">
          <NavLink to="/reports" className={navLinkClass}>
            <FileText className="h-5 w-5" />
            <span>Reports</span>
          </NavLink>
          <NavLink to="/analytics" className={navLinkClass}>
            <PieChart className="h-5 w-5" />
            <span>Analytics</span>
          </NavLink>
          <NavLink to="/news" className={navLinkClass}>
            <Newspaper className="h-5 w-5" />
            <span>News & Insights</span>
          </NavLink>
        </nav>
      </div>

      <div className="p-3 border-t border-midnight-50">
        <nav className="space-y-1">
          <NavLink to="/settings" className={navLinkClass}>
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </NavLink>
          <NavLink to="/help" className={navLinkClass}>
            <HelpCircle className="h-5 w-5" />
            <span>Help & Support</span>
          </NavLink>
          <button className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-400 hover:text-wayne-red hover:bg-midnight-100 w-full text-left">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;