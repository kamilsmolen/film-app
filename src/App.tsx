import "./App.css";

import React from "react";

import { Grid } from "./features/grid/Grid";
import { Input } from "./features/input/Input";
import { Modal } from "./features/modal/Modal";
import { ErrorModal } from "./features/errorModal/ErrorModal";

function App() {
  return (
    <div className="App">
      <Input />
      <Grid />
      <Modal />
      <ErrorModal />
    </div>
  );
}

export default App;
