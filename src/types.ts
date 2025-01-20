import type { ReactNode } from 'react';

interface WebviewMessage {
  type: string;
  data: any;
}

interface ProveProviderProps {
  children: ReactNode;
  sessionId: string;
  onClose: () => void;
  onSuccess: () => void;
  onEvent?: (eventName: string, data: ProveEventData) => void;
  reference?: string;
}

interface ProveEventData {
  reference?: string;
  errorType?: string;
  errorMessage?: string;
  pageName?: string;
  reason?: string;
  timestamp?: number;
}

interface MonoProveProps {
  sessionId: string;
  onClose: () => void;
  onSuccess: () => void;
  live?: boolean; // default is true
  setOpenWidget: (v: boolean) => void;
  openWidget: boolean;
  onEvent?: (eventName: string, data: ProveEventData) => void;
  reference?: string;
  children?: any;
}

interface ErrorProps {
  name: string | undefined;
  setOpenWidget: (v: boolean) => void;
}

export type {
  WebviewMessage,
  MonoProveProps,
  ProveProviderProps,
  ProveEventData,
  ErrorProps,
};
