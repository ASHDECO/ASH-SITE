export default function Accueil() {
  return (
    <div style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1>🎨 Bienvenue dans mon atelier 🖌️​</h1>
      <p>Découvrez mes œuvres originales et uniques.</p>
      <a href="/galerie" style={{
        background: "#3341c2",
        color: "#fff",
        borderRadius: 10,
        padding: "0.7em 2.5em",
        textDecoration: "none",
        fontWeight: 600,
        marginTop: 30,
        boxShadow: "0 3px 16px rgba(0,0,0,0.08)"
      }}>Voir la galerie</a>
    </div>
  );
}


