import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Galerie from "./pages/Galerie";
import Detail from "./pages/Detail";
import Panier from "./pages/Panier";
import Profil from "./pages/Profil";
import Commandes from "./pages/Commandes";
import Login from "./components/Login";
import Register from "./components/Register";
import QuiSuisJe from "./pages/QuiSuisJe";

export default function App() {
  return (
    <BrowserRouter>
      {/* La navbar reste en haut sur toutes les pages */}
      <Navbar />
      <main style={{
        minHeight: "calc(100vh - 70px)", // laisse la place à la navbar sticky
        width: "100%",
        background: "inherit",
        overflowX: "hidden"
      }}>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/oeuvre/:id" element={<Detail />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/commandes" element={<Commandes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quisuisje" element={<QuiSuisJe />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}


