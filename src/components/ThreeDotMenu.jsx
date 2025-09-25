import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function ThreeDotMenu(){
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('Last 2 days');

  return (
    <div className="relative">
      <button onClick={()=> setOpen(v=>!v)} className="p-2 rounded-full hover:bg-gray-100">
        <MoreHorizontal />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow rounded-lg p-3 w-48 z-50">
          <div className="text-sm font-semibold mb-2">Last days filter</div>
          <select value={filter} onChange={(e)=> setFilter(e.target.value)} className="w-full border px-2 py-1 rounded">
            <option>Last 2 days</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      )}
    </div>
  );
}
