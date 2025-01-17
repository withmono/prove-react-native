import React from 'react';
import { ProveContext } from './prove-provider';

function useMonoProve() {
  const context = React.useContext(ProveContext);
  if (context === undefined) {
    throw new Error(`useMonoProve must be used within a ProveProvider`);
  }

  return context;
}

export default useMonoProve;
