
import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import { DashboardContext } from '../context/DashboardContext';
import Category from './Category';
import AddWidgetForm from './AddWidgetForm';
import ThreeDotMenu from './ThreeDotMenu';

export default function Dashboard(){
  const { categories, searchResults } = useContext(DashboardContext);
  const [globalAddOpen, setGlobalAddOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">CNAPP Dashboard</h1>

        <div className="flex items-center gap-3">
          {/* Global Add Widget */}
          <button
            onClick={() => setGlobalAddOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Widget
          </button>

          <ThreeDotMenu />
        </div>
      </div>

      {/* Search results section */}
      {searchResults && (
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map(r => (
              <div key={r.id} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-500">{r.category}</div>
                    <h3 className="font-semibold break-words">{r.title}</h3>
                    <p className="text-xs text-gray-600 break-words">{r.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-10">
        {categories.map(cat => (
          <Category key={cat.id} category={cat} />
        ))}
      </div>

      {/* Global AddWidget modal */}
      {globalAddOpen && <AddWidgetForm setShowForm={setGlobalAddOpen} />}
    </div>
  );
}
