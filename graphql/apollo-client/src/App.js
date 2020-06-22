import React from 'react';
import Query from './component/Query'
import Mutation from './component/Mutation'
import Subscription from './component/Subscription'

function App() {
  return (
    <div >
      <Mutation></Mutation>
      {/* <Query></Query> */}
      <Subscription></Subscription>
    </div>
  );
}

export default App;
