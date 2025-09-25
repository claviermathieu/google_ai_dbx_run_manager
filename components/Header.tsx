import React from 'react';
import { DatabricksIcon, UserIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
                <DatabricksIcon className="h-8 w-8 text-brand-primary" />
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                    Databricks Run Manager
                </h1>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">John Doe</p>
                    <p className="text-xs text-slate-500">Data Scientist</p>
                </div>
                <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-slate-500" />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};
