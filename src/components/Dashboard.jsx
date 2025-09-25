import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import { DashboardContext } from '../context/DashboardContext';
import Category from './Category';
import AddWidgetForm from './AddWidgetForm';
import ThreeDotMenu from './ThreeDotMenu';

export default function Dashboard() {
  const { categories, searchResults } = useContext(DashboardContext);
  const [globalAddOpen, setGlobalAddOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <Navbar />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">CNAPP Dashboard</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Global Add Widget */}
          <button
            onClick={() => setGlobalAddOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto text-center"
          >
            + Add Widget
          </button>

          <ThreeDotMenu />
        </div>
      </div>

      {/* Search Results Section */}
      {searchResults && (
        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3">Search Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {searchResults.map((r) => (
              <div key={r.id} className="bg-white p-4 md:p-5 rounded-lg shadow border break-words">
                <div className="flex flex-col">
                  <div className="text-sm md:text-base text-gray-500 mb-1">{r.category}</div>
                  <h3 className="font-semibold text-gray-800 break-words md:text-lg">{r.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 break-words mt-1">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((cat) => (
          <Category key={cat.id} category={cat} />
        ))}
      </div>

      {/* Global AddWidget Modal */}
      {globalAddOpen && <AddWidgetForm setShowForm={setGlobalAddOpen} />}
    </div>
  );
}
