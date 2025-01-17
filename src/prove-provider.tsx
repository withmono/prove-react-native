import React from 'react';
import type { ProveProviderProps } from './types';
import MonoProve from './mono-prove';

export interface ProveContextType {
  init: () => void;
}

export const ProveContext = React.createContext<ProveContextType>({
  init: () => null,
});

function ProveProvider(props: ProveProviderProps) {
  const [openWidget, setOpenWidget] = React.useState<boolean>(false);

  function init() {
    setOpenWidget(true);
  }

  const payload = {
    openWidget,
    setOpenWidget,
    ...props,
  };

  return (
    <ProveContext.Provider value={{ init }}>
      <MonoProve {...payload} />
      {props.children}
    </ProveContext.Provider>
  );
}

export default ProveProvider;
