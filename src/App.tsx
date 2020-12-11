import './App.css';

import React from 'react';

import { Grid } from './features/grid/Grid';
import { Input } from './features/input/Input';

function App() {
  return (
    <div className="App">
      <Input />
      <Grid />
    </div>
  );
}

export default App;
