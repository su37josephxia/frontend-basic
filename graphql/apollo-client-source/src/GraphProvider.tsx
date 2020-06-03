import { Client } from "./client";
import React from 'react'
interface ProviderProps {
  client: Client;
}

export const graphqlContext: React.Context<{
  client: Client;
}> = React.createContext(null as any);

export const GraphProvider: React.FC<ProviderProps> = ({ client, children }) => {
  return (
    <graphqlContext.Provider value={{ client }}>
      {children}
    </graphqlContext.Provider>
  );
};
