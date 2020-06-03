import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Client } from './client'
import {Home} from './Home'

import {GraphProvider} from './GraphProvider'

const client = new Client({
  uri: "http://localhost:4000/graphql"
});

const App: React.FC = () => {
  return (
    <GraphProvider client={client}>
      <Home></Home>
    </GraphProvider>
  );
};


export default App;
