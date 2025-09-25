import React, { useState } from 'react';
import Widget from './Widget';
import AddWidgetForm from './AddWidgetForm';

export default function Category({ category }) {
  const [openForm, setOpenForm] = useState(false);

  return (
    <section className="mb-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">{category.name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {category.widgets.map((w) => (
          <Widget key={w.id} widget={w} categoryId={category.id} />
        ))}

        {/* Section-specific Add widget */}
        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center justify-center border-2 border-dashed rounded-xl p-6 md:p-8 text-gray-500 hover:bg-gray-50 transition-all w-full sm:w-auto"
        >
          + Add Widget
        </button>
      </div>

      {openForm && <AddWidgetForm categoryId={category.id} setShowForm={setOpenForm} />}
    </section>
  );
}
