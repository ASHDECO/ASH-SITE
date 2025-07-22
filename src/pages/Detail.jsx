import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [oeuvre, setOeuvre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState(null);

  useEffect(() => {
    async function fetchOeuvre() {
      setLoading(true);
      const { data, error } = await supabase
        .from("artworks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("Œuvre introuvable !");
        navigate("/galerie");
      } else {
        setOeuvre(data);
        // Fix pour images : array ou simple string
        const images = Array.isArray(data.images) ? data.images : data.image_url ? [data.image_url] : [];
        setMainImg(images[0] || null);
      }
      setLoading(false);
    }
    fetchOeuvre();
  }, [id, navigate]);

  if (loading) return <div style={{ textAlign: "center", marginTop: 50 }}>Chargement…</div>;
  if (!oeuvre) return null;

  const images = Array.isArray(oeuvre.images) ? oeuvre.images : oeuvre.image_url ? [oeuvre.image_url] : [];

// Ajoute cette fonction AVANT le return :
const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  // Pas de doublon dans le panier
  if (!cart.find(item => item.id === oeuvre.id)) {
    cart.push({
      id: oeuvre.id,
      title: oeuvre.title,
      price: oeuvre.price,
      type: oeuvre.type,
      image_url: Array.isArray(oeuvre.images) ? oeuvre.images[0] : oeuvre.image_url
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Ajouté au panier !");
  } else {
    alert("Déjà dans le panier.");
  }
};
  
return (
    <div style={{
      maxWidth: 1000,
      margin: "0 auto",
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 6px 32px rgba(30,40,80,0.11)",
      padding: "2.5em 2em",
      marginTop: "2em",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h2 style={{ marginBottom: 24 }}>{oeuvre.title}</h2>

      <div style={{ width: "100%", maxWidth: 540, marginBottom: 24 }}>
        {mainImg ? (
          <img
            src={mainImg}
            alt={oeuvre.title}
            style={{
              width: "100%",
              maxHeight: 370,
              objectFit: "cover",
              borderRadius: 14,
              boxShadow: "0 2px 12px #0001"
            }}
          />
        ) : (
          <div style={{
            width: "100%", height: 220, background: "#eee",
            borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#888"
          }}>
            Pas d’image
          </div>
        )}
      </div>

      {/* Miniatures, cliquables pour changer l’image principale */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: 12, marginBottom: 22 }}>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Visuel ${i + 1}`}
              onClick={() => setMainImg(img)}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 10,
                boxShadow: mainImg === img ? "0 2px 8px #3341c2" : "0 2px 8px #0001",
                border: mainImg === img ? "2.5px solid #3341c2" : "2px solid #eee",
                cursor: "pointer",
                opacity: mainImg === img ? 1 : 0.75,
                transition: "box-shadow .18s, border .16s, opacity .18s"
              }}
            />
          ))}
        </div>
      )}

      <div style={{
        color: "#6568a3",
        fontSize: 17,
        marginBottom: 12,
        textAlign: "center"
      }}>
        {oeuvre.type === "toile" ? "Toile de peinture" : oeuvre.type}
      </div>
      <div style={{
        fontSize: 21,
        fontWeight: 700,
        color: "#232323",
        marginBottom: 14
      }}>
        {oeuvre.price ? Number(oeuvre.price).toFixed(2) + " €" : ""}
      </div>
      <div style={{
        fontSize: 17,
        color: "#222",
        background: "#f8f8fc",
        borderRadius: 10,
        padding: "16px 22px",
        marginBottom: 22,
        maxWidth: 500,
        textAlign: "center"
      }}>
        {oeuvre.description}
      </div>

      <button
  style={{
    background: "#3341c2",
    color: "#fff",
    fontWeight: 600,
    fontSize: 18,
    border: "none",
    borderRadius: 9,
    padding: "0.7em 2.6em",
    cursor: "pointer",
    boxShadow: "0 2px 8px #223"
  }}
  onClick={addToCart}
>
       Ajouter au panier
     </button>
    </div>
  );
}

