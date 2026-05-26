import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
      </Routes>
    </BrowserRouter>
  );
}