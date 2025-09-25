
import React, { useState, useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

export default function AddWidgetForm({ categoryId, setShowForm }){
  const { addWidget, categories } = useContext(DashboardContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [type, setType] = useState('empty');
  const [selectedCat, setSelectedCat] = useState(categoryId || categories[0].id);

  const handleSubmit = (e) => {
    e.preventDefault();
    addWidget(selectedCat, title, text, type);
    setShowForm(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Add Widget</h3>
          <button onClick={() => setShowForm(false)} className="text-gray-500">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!categoryId && (
            <div>
              <label className="text-sm block mb-1">Choose Section</label>
              <select value={selectedCat} onChange={(e)=> setSelectedCat(e.target.value)} className="w-full border px-2 py-1 rounded">
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-sm block mb-1">Widget Name</label>
            <input value={title} onChange={(e)=> setTitle(e.target.value)} required className="w-full border px-2 py-1 rounded"/>
          </div>

          <div>
            <label className="text-sm block mb-1">Widget Text</label>
            <input value={text} onChange={(e)=> setText(e.target.value)} className="w-full border px-2 py-1 rounded"/>
          </div>

          <div>
            <label className="text-sm block mb-1">Widget Type</label>
            <select value={type} onChange={(e)=> setType(e.target.value)} className="w-full border px-2 py-1 rounded">
              <option value="empty">Empty</option>
              <option value="pie">Pie Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="tube">Horizontal Vessel</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={()=> setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
