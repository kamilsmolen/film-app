import "./App.css";

import React from "react";

import { Grid } from "../features/grid/Grid";
import { Input } from "../features/input/Input";
import { DetailsModal } from "../features/detailsModal/DetailsModal";
import { ErrorModal } from "../features/errorModal/ErrorModal";

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
