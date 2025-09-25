import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import { Bell } from 'lucide-react';

export default function Navbar(){
  const { searchQuery, setSearchQuery } = useContext(DashboardContext);

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-6">
      
      <div className="text-sm text-gray-500">Home › Dashboard V2</div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={18} />
        </button>
        <input
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}
          placeholder="Search anything..."
          className="px-3 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}
