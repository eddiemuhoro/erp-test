import { useEffect, useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { Route, Routes } from "react-router-dom";
import DetailsPage from "./components/sales_rows/details/Details";
import SplashScreen from "./components/splashscreen/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

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
