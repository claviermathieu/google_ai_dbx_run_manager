export enum RunStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface RunHistoryItem {
  id: string;
  startTime: string;
  duration: string;
  status: RunStatus;
  engineVersion: string;
  period: string;
  inputFile: string;
  outputFileUrl: string | null;
}

export interface CentralDataItem {
  id: string;
  name: string;
  type: string;
  lastUpdated: string;
  size: string;
  versions: string[];
}
