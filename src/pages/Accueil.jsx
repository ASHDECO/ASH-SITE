import { Link } from "react-router-dom";
import fondAccueil from '../assets/fondaccueil.jpg';

export default function Accueil() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* FOND D'ÉCRAN */}
      <img
        src={fondAccueil}
        alt=""
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
          filter: "brightness(0.72) blur(0.5px)",
          pointerEvents: "none",
        }}
      />

      {/* CARD DE TEXTE */}
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
        <div
          style={{
            background: "rgba(36, 36, 52, 0.48)", // Couleur sombre et teintée
            backdropFilter: "blur(12px)", // Flou derrière la card
            WebkitBackdropFilter: "blur(12px)", // Support Safari
            borderRadius: 18,
            padding: "3.5em 2.5em",
            boxShadow: "0 6px 32px #23243636",
            maxWidth: 480,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h1 style={{ fontWeight: 800, fontSize: 30, letterSpacing: 1 }}>
            🎨 Bienvenue dans mon atelier 🖌️​
          </h1>
          <p style={{ marginTop: 17, marginBottom: 25, fontSize: 18 }}>
            Découvrez mes œuvres originales et uniques.
          </p>
          <Link
            to="/galerie"
            style={{
              background: "#3341c2",
              color: "#fff",
              borderRadius: 10,
              padding: "0.7em 2.5em",
              textDecoration: "none",
              fontWeight: 600,
              marginTop: 18,
              boxShadow: "0 3px 16px rgba(0,0,0,0.12)"
            }}
          >
            Voir la galerie
          </Link>
        </div>
      </div>
    </div>
  );
}
