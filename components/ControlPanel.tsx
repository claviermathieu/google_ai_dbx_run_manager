import React, { useCallback } from 'react';
import { UploadIcon, RocketIcon, CubeIcon } from './icons';
import { CentralDataItem } from '../types';

interface ControlPanelProps {
  engineVersion: string;
  setEngineVersion: (version: string) => void;
  period: string;
  setPeriod: (period: string) => void;
  inputFile: File | null;
  setInputFile: (file: File | null) => void;
  onLaunchRun: () => void;
  isRunInProgress: boolean;
  centralData: CentralDataItem[];
  dataProductVersions: Record<string, string>;
  setDataProductVersions: (versions: Record<string, string>) => void;
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


export const ControlPanel: React.FC<ControlPanelProps> = ({
  engineVersion,
  setEngineVersion,
  period,
  setPeriod,
  inputFile,
  setInputFile,
  onLaunchRun,
  isRunInProgress,
  centralData,
  dataProductVersions,
  setDataProductVersions,
}) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInputFile(e.target.files[0]);
    }
  };
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          setInputFile(e.dataTransfer.files[0]);
          e.dataTransfer.clearData();
      }
  }, [setInputFile]);

  const handleVersionChange = (productId: string, newVersion: string) => {
    setDataProductVersions({
        ...dataProductVersions,
        [productId]: newVersion,
    });
  };


  const renderFileInput = () => (
    <div className="mt-2">
      <label onDragOver={onDragOver} onDrop={onDrop} className="flex flex-col items-center justify-center w-full p-6 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer hover:border-brand-primary transition-colors bg-slate-50">
        <div className="space-y-1 text-center">
          <UploadIcon className="mx-auto h-10 w-10 text-slate-400"/>
          <div className="flex text-sm text-slate-600">
            <span className="relative rounded-md font-medium text-brand-primary hover:text-brand-dark focus-within:outline-none">
              <span>Uploader un fichier</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
            </span>
            <p className="pl-1">ou glisser-déposer</p>
          </div>
          <p className="text-xs text-slate-500">CSV, XLS, XLSX, PARQUET</p>
        </div>
      </label>
      {inputFile && (
        <div className="mt-4 text-sm font-medium text-slate-700 bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-200">
          Fichier sélectionné : <span className="font-bold">{inputFile.name}</span>
        </div>
      )}
    </div>
  );

  return (
    <Card title="Panneau de Contrôle" icon={<RocketIcon className="h-6 w-6 text-brand-primary"/>}>
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Paramètres Généraux</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="engine-version" className="block text-sm font-medium text-slate-700 mb-1">
                Version de l'Engine
              </label>
              <select
                id="engine-version"
                value={engineVersion}
                onChange={(e) => setEngineVersion(e.target.value)}
                disabled={isRunInProgress}
                className="mt-1 block w-full px-3 py-2 text-base border border-slate-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option>14.3 LTS</option>
                <option>13.3 LTS</option>
                <option>12.2 LTS</option>
                <option>15.0 (Beta)</option>
              </select>
            </div>
            <div>
              <label htmlFor="period" className="block text-sm font-medium text-slate-700 mb-1">
                Période
              </label>
              <select
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                disabled={isRunInProgress}
                className="mt-1 block w-full px-3 py-2 text-base border border-slate-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
              >
                <option>2024-Q3</option>
                <option>2024-Q2</option>
                <option>2024-Q1</option>
                <option>2023-Q4</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3 flex items-center"><CubeIcon className="h-4 w-4 mr-2"/>Choix des versions de données centrales (Data Products)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {centralData.map(product => (
                  <div key={product.id}>
                      <label htmlFor={`dp-version-${product.id}`} className="block text-sm font-medium text-slate-700 mb-1">
                          {product.name}
                      </label>
                      <select
                          id={`dp-version-${product.id}`}
                          value={dataProductVersions[product.id] || ''}
                          onChange={(e) => handleVersionChange(product.id, e.target.value)}
                          disabled={isRunInProgress}
                          className="mt-1 block w-full px-3 py-2 text-base border border-slate-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent sm:text-sm disabled:bg-slate-100 disabled:cursor-not-allowed"
                      >
                          {product.versions.map(version => (
                              <option key={version} value={version}>{version}</option>
                          ))}
                      </select>
                  </div>
              ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
           <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Données d'Entrée</h3>
          {renderFileInput()}
        </div>
        
        <div className="border-t border-slate-200 pt-8">
          <button
            onClick={onLaunchRun}
            disabled={!inputFile || isRunInProgress}
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200"
          >
            Lancer l'Exécution
          </button>
        </div>
      </div>
    </Card>
  );
};