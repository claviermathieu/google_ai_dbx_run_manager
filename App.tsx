import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { StatusPanel } from './components/StatusPanel';
import { DataViewer } from './components/DataViewer';
import { HistoryPanel } from './components/HistoryPanel';
import { RunStatus, RunHistoryItem, CentralDataItem } from './types';

const centralData: CentralDataItem[] = [
  { id: 'DS-001', name: 'Référentiel Produits', type: 'Table Delta', lastUpdated: '2024-07-20', size: '1.2 GB', versions: ['2.3 (latest)', '2.2', '2.1'] },
  { id: 'DS-002', name: 'Historique Ventes EU', type: 'Table Delta', lastUpdated: '2024-07-21', size: '15.8 GB', versions: ['1.9.1 (latest)', '1.9.0', '1.8.5'] },
  { id: 'DS-003', name: 'Logs Applicatifs', type: 'Fichiers Parquet', lastUpdated: '2024-07-22', size: '5.3 GB', versions: ['3.0 (latest)', '2.5', '2.0'] },
  { id: 'DS-004', name: 'Données Marketing', type: 'Table Delta', lastUpdated: '2024-07-19', size: '850 MB', versions: ['4.2 (latest)', '4.1.1', '4.0'] },
];


const App: React.FC = () => {
  const [engineVersion, setEngineVersion] = useState('14.3 LTS');
  const [period, setPeriod] = useState('2024-Q3');
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [status, setStatus] = useState<RunStatus>(RunStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [outputFileUrl, setOutputFileUrl] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState('');
  const [history, setHistory] = useState<RunHistoryItem[]>([]);
  const [dataProductVersions, setDataProductVersions] = useState<Record<string, string>>(
    centralData.reduce((acc, item) => {
      acc[item.id] = item.versions[0]; // Default to the first (latest) version
      return acc;
    }, {} as Record<string, string>)
  );

  const isRunInProgress = status === RunStatus.RUNNING;

  const handleLaunchRun = useCallback(async () => {
    if (!inputFile) return;

    setStatus(RunStatus.RUNNING);
    setErrorMessage('');
    setOutputFileUrl(null);
    
    const runId = `run_${Date.now()}`;
    const startTime = new Date();

    const newHistoryItem: RunHistoryItem = {
      id: runId,
      startTime: startTime.toLocaleString(),
      duration: 'N/A',
      status: RunStatus.RUNNING,
      engineVersion,
      period,
      inputFile: inputFile.name,
      outputFileUrl: null,
    };
    setHistory(prev => [newHistoryItem, ...prev]);

    // Simulate a multi-step process
    try {
      setProgressMessage('Étape 1/4: Initialisation du cluster Databricks...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      setProgressMessage('Étape 2/4: Téléversement des données d\'entrée...');
      await new Promise(resolve => setTimeout(resolve, 3000));

      setProgressMessage('Étape 3/4: Exécution du notebook de traitement...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Simulate a random failure
      if (Math.random() > 0.8) {
        throw new Error("Erreur de Spark: Impossible d'allouer la mémoire sur le worker node.");
      }

      setProgressMessage('Étape 4/4: Finalisation et collecte des résultats...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      const blob = new Blob([`Résultat du run ${runId} pour ${inputFile.name}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setOutputFileUrl(url);
      setStatus(RunStatus.SUCCESS);
      
      const endTime = new Date();
      const duration = `${((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2)}s`;

      setHistory(prev => prev.map(item => item.id === runId ? { ...item, status: RunStatus.SUCCESS, duration, outputFileUrl: url } : item));

    } catch (error) {
      const message = error instanceof Error ? error.message : "Une erreur inconnue est survenue.";
      setErrorMessage(message);
      setStatus(RunStatus.ERROR);
      
      const endTime = new Date();
      const duration = `${((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2)}s`;
      setHistory(prev => prev.map(item => item.id === runId ? { ...item, status: RunStatus.ERROR, duration } : item));
    } finally {
        setProgressMessage('');
    }
  }, [inputFile, engineVersion, period, dataProductVersions]);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ControlPanel
              engineVersion={engineVersion}
              setEngineVersion={setEngineVersion}
              period={period}
              setPeriod={setPeriod}
              inputFile={inputFile}
              setInputFile={setInputFile}
              onLaunchRun={handleLaunchRun}
              isRunInProgress={isRunInProgress}
              centralData={centralData}
              dataProductVersions={dataProductVersions}
              setDataProductVersions={setDataProductVersions}
            />
            <DataViewer centralData={centralData} />
          </div>
          <div className="lg:col-span-1">
            <StatusPanel
              status={status}
              errorMessage={errorMessage}
              outputFileUrl={outputFileUrl}
              progressMessage={progressMessage}
            />
          </div>
        </div>
        <div className="mt-8">
          <HistoryPanel history={history} />
        </div>
      </main>
    </div>
  );
};

export default App;