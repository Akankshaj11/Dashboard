
import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const COLORS = ['#2563eb', '#ef4444', '#f59e0b', '#10b981'];

export default function Widget({ widget, categoryId }){
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
        <div className="h-40 p-2">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={30} outerRadius={60} paddingAngle={2}>
                {pieData.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 break-words">Insights: {widget.text}</p>
        </div>
        
      );
    }

    if (widget.type === 'bar') {
      return (
        <div className="h-40 p-2">
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 break-words">{widget.text}</p>
        </div>
      );
    }

    if (widget.type === 'tube') {
      const percent = widget.percent ?? 70;
      return (
        <div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{width: `${percent}%`}} />
          </div>
          <p className="text-xs text-gray-500 mt-2">{widget.text} ({percent}%)</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
        <BarChart3 size={36} />
        <div className="text-sm mt-2">No graph data available</div>
        <div className="text-xs mt-1 text-gray-500">{widget.text}</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 relative border border-gray-200 overflow-hidden">
      <button
        onClick={() => removeWidget(categoryId, widget.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        title="Remove widget"
      >
        ✕
      </button>

      <h3 className="text-md font-semibold text-gray-800 break-words mb-2">{widget.title}</h3>
      {renderContent()}
    </div>
  );
}
