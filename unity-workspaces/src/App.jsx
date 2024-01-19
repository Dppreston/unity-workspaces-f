import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "../src/pages/Landing";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const loginCheck = () => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("logged in");
    } else {
      console.log("logged out");
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
