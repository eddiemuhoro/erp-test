import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { Route, Routes } from "react-router-dom";
import DetailsPage from "./components/sales_rows/details/Details";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/:id" element={<DetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
