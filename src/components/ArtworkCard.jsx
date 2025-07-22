import { Link } from "react-router-dom";

export default function ArtworkCard({ artwork }) {
  // On prend la première image
  const image = Array.isArray(artwork.images) ? artwork.images[0] : artwork.image_url;

  return (
    <Link to={`/oeuvre/${artwork.id}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(60,80,120,0.15)",
        padding: 20,
        margin: 6,
        width: 275,
        minHeight: 340,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "box-shadow .2s, transform .2s",
        cursor: "pointer"
      }}
        className="artwork-card"
        tabIndex={0}
      >
        {image &&
          <img
            src={image}
            alt={artwork.title}
            style={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderRadius: 10,
              boxShadow: "0 2px 10px #0001",
              marginBottom: 18,
              background: "#f0f0f0"
            }}
          />
        }
        <div style={{
          color: "#1e237c",
          fontWeight: 600,
          fontSize: 18,
          marginBottom: 8,
          textAlign: "center"
        }}>{artwork.title}</div>
        <div style={{
          color: "#6568a3",
          fontSize: 16,
          marginBottom: 8,
          textAlign: "center"
        }}>{artwork.type === "toile" ? "Toile de peinture" : artwork.type}</div>
        <div style={{
          color: "#232323",
          fontWeight: 700,
          fontSize: 19,
          marginTop: "auto"
        }}>
          {artwork.price ? Number(artwork.price).toFixed(2) + " €" : ""}
        </div>
      </div>
      <style>{`
        .artwork-card:hover {
          box-shadow: 0 16px 48px rgba(30,50,180,0.18);
          transform: translateY(-2px) scale(1.03);
        }
      `}</style>
    </Link>
  );
}
