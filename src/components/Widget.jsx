import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const COLORS = ['#2563eb', '#ef4444', '#f59e0b', '#10b981'];

export default function Widget({ widget, categoryId }) {
  const { removeWidget } = useContext(DashboardContext);

  const pieData = [
    { name: 'Connected', value: 60 },
    { name: 'Not Connected', value: 40 }
  ];
  const barData = [
    { name: 'Critical', value: 5 },
    { name: 'High', value: 12 },
    { name: 'Medium', value: 20 }
  ];

  const renderContent = () => {
    if (widget.type === 'pie') {
      return (
        <div className="h-40 md:h-48 p-2 md:p-3">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={30} outerRadius={60} paddingAngle={2}>
                {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs md:text-sm text-gray-500 break-words mt-1">{widget.text}</p>
        </div>
      );
    }

    if (widget.type === 'bar') {
      return (
        <div className="h-40 md:h-48 p-2 md:p-3">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs md:text-sm text-gray-500 break-words mt-1">{widget.text}</p>
        </div>
      );
    }

    if (widget.type === 'tube') {
      const percent = widget.percent ?? 70;
      return (
        <div className="p-2 md:p-3">
          <div className="h-4 md:h-5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${percent}%` }} />
          </div>
          <p className="text-xs md:text-sm text-gray-500 mt-2 break-words">{widget.text} ({percent}%)</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-40 md:h-48 text-gray-400 p-2 md:p-3">
        <BarChart3 size={36} />
        <div className="text-sm md:text-base mt-2 text-center">No graph data available</div>
        <div className="text-xs md:text-sm mt-1 text-gray-500 text-center break-words">{widget.text}</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-3 md:p-4 relative border border-gray-200 overflow-hidden">
      {/* Remove button */}
      <button
        onClick={() => removeWidget(categoryId, widget.id)}
        className="absolute top-2 md:top-3 right-2 md:right-3 text-gray-400 hover:text-red-500 text-sm md:text-base"
        title="Remove widget"
      >
        ✕
      </button>

      {/* Widget title */}
      <h3 className="text-md md:text-lg font-semibold text-gray-800 break-words mb-2">{widget.title}</h3>

      {renderContent()}
    </div>
  );
}
