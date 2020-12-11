import "./App.css";

import React from "react";

import { DetailsModal } from "../features/detailsModal/DetailsModal";
import { ErrorModal } from "../features/errorModal/ErrorModal";
import { Grid } from "../features/grid/Grid";
import { Input } from "../features/input/Input";

function App() {
  return (
    <div className="App">
      <Input />
      <Grid />
      <DetailsModal />
      <ErrorModal />
    </div>
  );
}

export default App;
