import React from 'react';
import { ProveContext } from './prove-provider';

function useProveContext() {
  const context = React.useContext(ProveContext);
  if (context === undefined) {
    throw new Error(`useProveContext must be used within a ProveProvider`);
  }

  return context;
}

export default useProveContext;
