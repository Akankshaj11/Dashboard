import React, { createContext, useState, useMemo } from 'react';
import data from '../data/dashboardData.json';
import { v4 as uuidv4 } from 'uuid';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [categories, setCategories] = useState(data.categories);
  const [searchQuery, setSearchQuery] = useState('');

  const addWidget = (categoryId, title, text, type = 'empty') => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, { id: uuidv4(), title, text, type }] }
          : cat
      )
    );
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
          : cat
      )
    );
  };

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const results = [];
    for (const cat of categories) {
      for (const w of cat.widgets) {
        if ((w.title || '').toLowerCase().includes(q) || (w.text || '').toLowerCase().includes(q)) {
          results.push({ ...w, category: cat.name, categoryId: cat.id });
        }
      }
    }
    return results;
  }, [searchQuery, categories]);

  return (
    <DashboardContext.Provider value={{
      categories,
      addWidget,
      removeWidget,
      searchQuery,
      setSearchQuery,
      searchResults
    }}>
      {children}
    </DashboardContext.Provider>
  );
};
