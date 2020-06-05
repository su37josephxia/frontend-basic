import React from 'react';
import Query from './component/Query'
import Mutation from './component/Mutation'
import Subscription from './component/Subscription'

function App() {
  return (
    <div >
      <Query></Query>
      <Mutation></Mutation>
      <Subscription></Subscription>
    </div>
  );
}

export default App;
