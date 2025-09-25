import React from 'react';
import { RunStatus } from '../types';
import { SpinnerIcon, CheckCircleIcon, XCircleIcon, DownloadIcon, StandbyIcon } from './icons';

interface StatusPanelProps {
  status: RunStatus;
  errorMessage: string;
  outputFileUrl: string | null;
  progressMessage: string;
}

const Card: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
    <div className="bg-white p-8 rounded-2xl shadow-subtle transition-shadow hover:shadow-subtle-hover h-full">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">{title}</h2>
        <div className="flex flex-col justify-center items-center h-full -mt-12">{children}</div>
    </div>
);

export const StatusPanel: React.FC<StatusPanelProps> = ({ status, errorMessage, outputFileUrl, progressMessage }) => {

  const renderContent = () => {
    switch (status) {
      case RunStatus.IDLE:
        return (
          <div className="text-center text-slate-500">
            <StandbyIcon className="h-16 w-16 text-slate-300 mb-4 mx-auto"/>
            <p className="font-medium">En attente d'une exécution</p>
            <p className="text-sm">Veuillez configurer et lancer un run.</p>
          </div>
        );
      case RunStatus.RUNNING:
        return (
          <div className="text-center text-slate-600">
            <SpinnerIcon className="h-16 w-16 text-brand-primary mb-4 mx-auto" />
            <p className="font-semibold text-lg animate-pulse text-brand-dark">Exécution en cours...</p>
            <p className="text-sm text-slate-500 mt-2">{progressMessage || "Veuillez patienter."}</p>
          </div>
        );
      case RunStatus.SUCCESS:
        return (
          <div className="text-center text-green-700">
            <CheckCircleIcon className="h-16 w-16 text-success mb-4 mx-auto" />
            <p className="font-semibold text-lg text-slate-800">Exécution terminée avec succès !</p>
            {outputFileUrl && (
              <a
                href={outputFileUrl}
                download="databricks_output.txt"
                className="mt-6 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-success hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
              >
                <DownloadIcon className="h-5 w-5 mr-2" />
                Télécharger les Outputs
              </a>
            )}
          </div>
        );
      case RunStatus.ERROR:
        return (
          <div className="text-center text-red-700">
            <XCircleIcon className="h-16 w-16 text-danger mb-4 mx-auto" />
            <p className="font-semibold text-lg text-slate-800">Échec de l'exécution</p>
            <p className="mt-2 text-sm bg-red-50 p-3 rounded-lg border border-red-200 text-red-800 w-full">{errorMessage}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return <Card title="Statut de l'Exécution">{renderContent()}</Card>;
};
