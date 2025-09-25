
import React from 'react';
import { RunHistoryItem, RunStatus } from '../types';
import { HistoryIcon, CheckCircleIcon, XCircleIcon, SpinnerIcon, DownloadIcon } from './icons';

interface HistoryPanelProps {
  history: RunHistoryItem[];
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

const StatusIndicator: React.FC<{ status: RunStatus }> = ({ status }) => {
    switch (status) {
        case RunStatus.SUCCESS:
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircleIcon className="h-4 w-4 mr-1.5 text-success"/> Succès</span>;
        case RunStatus.ERROR:
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircleIcon className="h-4 w-4 mr-1.5 text-danger"/> Échec</span>;
        case RunStatus.RUNNING:
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><SpinnerIcon className="h-4 w-4 mr-1.5"/> En cours</span>;
        default:
            return null;
    }
};


export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  return (
    <Card title="Historique des Exécutions" icon={<HistoryIcon className="h-6 w-6 text-brand-primary"/>}>
      <div className="overflow-x-auto -mx-8">
        <table className="min-w-full">
          <thead className="border-b border-slate-200">
            <tr>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Run ID</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Durée</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fichier</th>
              <th scope="col" className="px-8 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Output</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {history.length === 0 ? (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-500">
                        Aucune exécution dans l'historique.
                    </td>
                </tr>
            ) : (
                history.map((run, index) => (
                  <tr key={run.id} className={`hover:bg-slate-50 transition-colors ${index !== history.length - 1 ? 'border-b border-slate-200' : ''}`}>
                    <td className="px-8 py-4 whitespace-nowrap text-sm font-mono text-slate-500">{run.id}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-600"><StatusIndicator status={run.status} /></td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-500">{run.startTime}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-500">{run.duration}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm text-slate-600 font-medium truncate max-w-xs">{run.inputFile}</td>
                    <td className="px-8 py-4 whitespace-nowrap text-sm">
                        {run.outputFileUrl ? (
                            <a href={run.outputFileUrl} download className="inline-flex items-center text-brand-primary hover:text-brand-dark font-medium">
                                <DownloadIcon className="h-4 w-4 mr-1.5"/>
                                Télécharger
                            </a>
                        ) : '-'}
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
