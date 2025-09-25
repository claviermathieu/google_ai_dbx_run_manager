import React from 'react';
import { DatabaseIcon } from './icons';
import { CentralDataItem } from '../types';

interface DataViewerProps {
  centralData: CentralDataItem[];
}

const Card: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-white p-8 rounded-2xl shadow-subtle transition-shadow hover:shadow-subtle-hover">
        <div className="flex items-center space-x-3 mb-6">
            {icon}
            <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
        </div>
        <div>{children}</div>
    </div>
);


export const DataViewer: React.FC<DataViewerProps> = ({ centralData }) => {
  return (
    <Card title="Données Centrales Disponibles" icon={<DatabaseIcon className="h-6 w-6 text-brand-primary"/>}>
      <div className="overflow-x-auto -mx-8">
        <table className="min-w-full">
          <thead className="border-b border-slate-200">
            <tr>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nom du Dataset</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Dernière MàJ</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Taille</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {centralData.map((data, index) => (
              <tr key={data.id} className={`hover:bg-slate-50 transition-colors ${index !== centralData.length - 1 ? 'border-b border-slate-200' : ''}`}>
                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{data.id}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-600">{data.name}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-500">{data.type}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-500">{data.lastUpdated}</td>
                <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-500">{data.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};