import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import ArtworkCard from "../components/ArtworkCard";

export default function Galerie() {
  const [oeuvres, setOeuvres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOeuvres() {
      setLoading(true);
      let { data, error } = await supabase
        .from("artworks")      // Assure-toi que ta table s'appelle bien 'artworks'
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        alert("Erreur lors du chargement : " + error.message);
      } else {
        setOeuvres(data || []);
      }
      setLoading(false);
    }
    fetchOeuvres();
  }, []);

  return (
    <div style={{ maxWidth: 1300, margin: "0 auto", padding: "2em 0" }}>
      <h2 style={{ marginBottom: 30 }}>Galerie des œuvres</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="gallery-cards">
          {oeuvres.length === 0 && <div>Aucune œuvre trouvée.</div>}
          {oeuvres.map(artwork =>
            <ArtworkCard key={artwork.id} artwork={artwork} />
          )}
        </div>
      )}
      <style>{`
        .gallery-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 32px;
          justify-content: center;
          width: 100%;
          max-width: 100vw;
        }
      `}</style>
    </div>
  );
}
