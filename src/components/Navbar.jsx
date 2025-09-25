
import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { Bell } from 'lucide-react';

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(DashboardContext);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6 gap-3 sm:gap-0">
      
      {/* Breadcrumb / page info */}
      <div className="text-sm md:text-base text-gray-500 w-full sm:w-auto">
        Home › Dashboard V2
      </div>

      {/* Search + notifications */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anything..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="p-2 rounded-full hover:bg-gray-100 ml-2 sm:ml-0">
          <Bell size={18} />
        </button>
      </div>
    </div>
  );
}
