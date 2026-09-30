import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Animals from "./pages/Animals";
import AnimalDetails from "./pages/AnimalDetails";
import AdoptionForm from "./pages/AdoptionForm";
import ShelterApplications from "./pages/ShelterApplications";
import AdopterApplications from "./pages/AdopterApplications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/animals/:id" element={<AnimalDetails />} />
        <Route path="/adopt/:id" element={<AdoptionForm />} />
        <Route path="/shelter/applications" element={<ShelterApplications />} />
        <Route path="/adopter/applications" element={<AdopterApplications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;