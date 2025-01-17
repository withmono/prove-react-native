import React from 'react';
import { MonoProveProviderProps } from './types';

export interface MonoProveContextType {
  init: () => void;
  reauthorise: (reauth_code: string) => void;
  scope?: string;
}

export const MonoProveContext = React.createContext<MonoProveContextType>({
  init: () => null,
  reauthorise: () => null,
});

function MonoProveProvider(props: MonoProveProviderProps) {
  const [openWidget, setOpenWidget] = React.useState<boolean>(false);
  const [reauthToken, setReauthToken] = React.useState<any>(null);

  function init() {
    setReauthToken(null);
    setOpenWidget(true);
  }

  function reauthorise(reauth_token: string) {
    setReauthToken(reauth_token);
    setOpenWidget(true);
  }

  const payload = {
    openWidget,
    setOpenWidget,
    ...props
  }

  if (reauthToken){
    payload['reauth_token'] = reauthToken
  }

  return (
    <MonoContext.Provider value={{init, reauthorise, scope: props?.scope}}>
      <MonoConnect {...payload} />
      {props.children}
    </MonoContext.Provider>
  )
}

export default MonoProvider
