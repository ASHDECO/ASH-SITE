import { useState, useEffect } from "react";

export default function Panier() {
  // Panier stocké dans le localStorage pour ce starter (avant gestion des comptes)
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Synchronise avec localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Supprimer un article
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calcul total
  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div style={{
      maxWidth: 800, margin: "0 auto", padding: "2em 1em",
      minHeight: 450
    }}>
      <h2>Votre panier</h2>
      {cart.length === 0 ? (
        <div style={{ marginTop: 40, color: "#444" }}>Le panier est vide.</div>
      ) : (
        <div>
          <div style={{
            display: "flex", flexDirection: "column", gap: 20, marginBottom: 30
          }}>
            {cart.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center",
                background: "#fff", borderRadius: 12,
                boxShadow: "0 2px 12px #0002",
                padding: 16, gap: 16,
                flexWrap: "wrap"
              }}>
                <img src={item.image_url || (item.images && item.images[0])}
                  alt={item.title}
                  style={{ width: 82, height: 82, objectFit: "cover", borderRadius: 8 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 17 }}>{item.title}</div>
                  <div style={{ color: "#7b7fad", fontSize: 15 }}>{item.type}</div>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{Number(item.price).toFixed(2)} €</div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    background: "#fff", color: "#3341c2", border: "1px solid #3341c2",
                    borderRadius: 8, padding: "7px 16px", cursor: "pointer", fontWeight: 600
                  }}>
                  Retirer
                </button>
              </div>
            ))}
          </div>
          <div style={{
            fontSize: 19, fontWeight: 700,
            textAlign: "right", marginBottom: 28
          }}>
            Total&nbsp;: {Number(total).toFixed(2)} €
          </div>
          <button style={{
            background: "#3341c2", color: "#fff", fontWeight: 700,
            fontSize: 18, border: "none", borderRadius: 8, padding: "0.7em 2.4em",
            boxShadow: "0 2px 8px #223", cursor: "pointer", width: "100%", maxWidth: 260
          }}
            onClick={() => alert("Tunnel de commande à venir !")}
          >Valider la commande</button>
        </div>
      )}

      {/* Styles responsive */}
      <style>{`
        @media (max-width: 650px) {
          .panier-ligne {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}


