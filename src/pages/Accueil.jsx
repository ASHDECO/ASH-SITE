import { Link } from "react-router-dom";
import fondAccueil from '../assets/fondacceuil.jpg'; // Assure-toi que le nom du fichier est EXACT

export default function Accueil() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* FOND D'ÉCRAN */}
      <img
        src={fondAccueil}
        alt=""
        style={{
          position: "fixed",     // Fixed pour que le fond reste en place si on scrolle
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
          filter: "brightness(0.78) blur(0.5px)", // Optionnel, tamisé
          pointerEvents: "none",
        }}
      />

      {/* CONTENU */}
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1>🎨 Bienvenue dans mon atelier 🖌️​</h1>
        <p>Découvrez mes œuvres originales et uniques.</p>
        <Link
          to="/galerie"
          style={{
            background: "#3341c2",
            color: "#fff",
            borderRadius: 10,
            padding: "0.7em 2.5em",
            textDecoration: "none",
            fontWeight: 600,
            marginTop: 30,
            boxShadow: "0 3px 16px rgba(0,0,0,0.08)"
          }}
        >
          Voir la galerie
        </Link>
      </div>
    </div>
  );
}
