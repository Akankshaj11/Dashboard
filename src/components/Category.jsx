

import React, { useState } from 'react';
import Widget from './Widget';
import AddWidgetForm from './AddWidgetForm';

export default function Category({ category }){
  const [openForm, setOpenForm] = useState(false);

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{category.name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.widgets.map(w => (
          <Widget key={w.id} widget={w} categoryId={category.id} />
        ))}

        {/* Section-specific Add widget  */}
        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center justify-center border-2 border-dashed rounded-xl p-6 text-gray-500 hover:bg-gray-50"
        >
          + Add Widget
        </button>
      </div>

      {openForm && <AddWidgetForm categoryId={category.id} setShowForm={setOpenForm} />}
    </section>
  );
}

