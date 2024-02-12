import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "../src/components/room/AddRoom";

function App() {
  return (
    <BrowserRouter>
      <AddRoom />
    </BrowserRouter>
  );
}

export default App;
