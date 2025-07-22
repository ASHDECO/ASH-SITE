import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Profil() {
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [edit, setEdit] = useState(false);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  // Chargement user + profile + commandes
  useEffect(() => {
    let ignore = false;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (ignore) return;
      setUser(user);
      if (user) {
        // Récupère profil
        let { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setProfile(profile);

        // Récupère commandes du user
        let { data: orders } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setOrders(orders || []);
      }
    });
    // On écoute les changements de session
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      ignore = true;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  // Edition du profil client
  async function handleSaveProfile(e) {
    e.preventDefault();
    setPending(true);
    const { phone, address } = e.target.elements;
    let up = {
  id: user.id,
  name: name.value,         // <-- Ajoute name !
  phone: phone.value,
  address: address.value,
};

    // Upsert profile
    const { error } = await supabase.from("profiles").upsert(up, { onConflict: "id" });
    if (!error) {
      setProfile({ ...profile, ...up });
      setEdit(false);
    } else {
      alert("Erreur enregistrement : " + error.message);
    }
    setPending(false);
  }

  // Si déjà connecté, affiche son espace
  if (user) {
    return (
      <div style={{ maxWidth: 450, margin: "2.5em auto", background: "#fff", borderRadius: 16, boxShadow: "0 3px 16px #0002", padding: "2em 1.3em" }}>
        <h2>Espace client</h2>
        <div style={{ fontSize: 17, marginBottom: 12 }}>
          <strong>Email :</strong> {user.email}
        </div>
        <div style={{ fontSize: 16, marginBottom: 12 }}>
          <strong>Nom :</strong> {profile?.name || user.user_metadata?.name || <span style={{ color: "#999" }}>Non renseigné</span>}
        </div>
        {edit ? (
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      setPending(true);
      const name = e.target.name.value;
      const phone = e.target.phone.value;
      const address = e.target.address.value;
      // Upsert profile dans Supabase
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        name,
        phone,
        address,
      }, { onConflict: "id" });
      if (!error) {
        setProfile({ ...profile, name, phone, address });
        setEdit(false);
      } else {
        alert("Erreur enregistrement : " + error.message);
      }
      setPending(false);
    }}
    style={{ marginBottom: 12 }}
  >
    <input
      name="name"
      placeholder="Nom complet"
      defaultValue={profile?.name || user.user_metadata?.name || ""}
      style={{ width: "100%", marginBottom: 10, padding: "7px 10px" }}
      required
    />
    <input
      name="phone"
      placeholder="Téléphone"
      defaultValue={profile?.phone || ""}
      style={{ width: "100%", marginBottom: 10, padding: "7px 10px" }}
    />
    <input
      name="address"
      placeholder="Adresse postale"
      defaultValue={profile?.address || ""}
      style={{ width: "100%", marginBottom: 10, padding: "7px 10px" }}
    />
    <button type="submit" disabled={pending} style={{ marginRight: 8 }}>
      {pending ? "Enregistrement..." : "Enregistrer"}
    </button>
    <button type="button" onClick={() => setEdit(false)} style={{ background: "#eee", color: "#3341c2", marginLeft: 8 }}>
      Annuler
    </button>
  </form>
) : (
  <>
    <div style={{ fontSize: 16, marginBottom: 7 }}>
      <strong>Nom :</strong> {profile?.name || <span style={{ color: "#999" }}>Non renseigné</span>}
    </div>
    <div style={{ fontSize: 16, marginBottom: 7 }}>
      <strong>Téléphone :</strong> {profile?.phone || <span style={{ color: "#999" }}>Non renseigné</span>}
    </div>
    <div style={{ fontSize: 16, marginBottom: 13 }}>
      <strong>Adresse :</strong> {profile?.address || <span style={{ color: "#999" }}>Non renseignée</span>}
    </div>
    <button onClick={() => setEdit(true)} style={{ marginBottom: 18 }}>Modifier mes infos</button>
  </>
)}


        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.reload();
          }}
          style={{
            marginTop: 20, background: "#d13c3c", color: "#fff", border: "none",
            borderRadius: 8, padding: "0.7em 1.6em", fontWeight: 600, fontSize: 16, cursor: "pointer"
          }}
        >
          Se déconnecter
        </button>

        <h3 style={{ marginTop: 32 }}>Mes commandes</h3>
        {orders.length === 0 ? (
          <div style={{ color: "#999", marginTop: 12 }}>Aucune commande passée.</div>
        ) : (
          <ul style={{ padding: 0, marginTop: 12, listStyle: "none" }}>
            {orders.map(cmd => (
              <li key={cmd.id} style={{
                background: "#f8f8fc",
                marginBottom: 12,
                borderRadius: 8,
                padding: "1em 1em",
                boxShadow: "0 1px 6px #ddd4",
              }}>
                <div><strong>Commande n°</strong>{cmd.id.slice(0, 7)}...</div>
                <div><strong>Date :</strong> {new Date(cmd.created_at).toLocaleDateString()}</div>
                <div><strong>Statut :</strong> {cmd.status}</div>
                <div><strong>Total :</strong> {Number(cmd.total).toFixed(2)} €</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Sinon, formulaire login/register (reprend la logique précédente)
  return (
    <div style={{
      maxWidth: 370, margin: "0 auto", padding: "3em 1em 2em 1em",
      display: "flex", flexDirection: "column", alignItems: "center"
    }}>
      <div className="profil-card">
        <h2 style={{ textAlign: "center", marginBottom: 18 }}>
          {showRegister ? "Créer un compte" : "Connexion"}
        </h2>
        {showRegister
          ? <RegisterForm onSwitch={() => setShowRegister(false)} />
          : <LoginForm onSwitch={() => setShowRegister(true)} />}
      </div>
      <style>{`
        .profil-card {
          width: 100%;
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 3px 18px #0002;
          padding: 2em 1.5em;
          margin-top: 2.5em;
          max-width: 390px;
        }
        .profil-card input {
          margin-bottom: 1.1em;
          width: 100%;
          padding: 0.7em 1em;
          border-radius: 8px;
          border: 1.1px solid #ccd1ee;
          font-size: 1em;
        }
        .profil-card button {
          width: 100%;
          background: #3341c2;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.9em;
          font-weight: bold;
          font-size: 1.07em;
          margin-bottom: 1.3em;
          cursor: pointer;
          transition: background 0.18s;
        }
        .profil-card button:hover {
          background: #232a7d;
        }
        .switch-link {
          color: #3341c2;
          background: none;
          border: none;
          font-size: 0.99em;
          text-decoration: underline;
          cursor: pointer;
        }
        .profil-error {
          color: #d13c3c;
          background: #fff4f4;
          border: 1px solid #ffd6d6;
          border-radius: 6px;
          padding: 7px 11px;
          font-size: 0.99em;
          margin-bottom: 1em;
          text-align: center;
        }
        .profil-success {
          color: #116e37;
          background: #edfff5;
          border: 1px solid #c0ffdd;
          border-radius: 6px;
          padding: 7px 11px;
          font-size: 0.99em;
          margin-bottom: 1em;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

function LoginForm({ onSwitch }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError(""); setSuccess(""); setPending(true);

    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password: pw });
      setPending(false);

      if (error) {
        setError("Erreur : " + error.message);
      } else if (data && data.user) {
        setSuccess("Connexion réussie !");
        setTimeout(() => {
          navigate("/profil");
          window.location.reload();
        }, 600);
      } else {
        setError("Erreur inconnue, veuillez réessayer.");
      }
    } catch (e) {
      setError("Erreur JS : " + e.message);
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Adresse email"
        value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
      <input type="password" placeholder="Mot de passe"
        value={pw} onChange={e => setPw(e.target.value)} required />
      {error && <div className="profil-error">{error}</div>}
      {success && <div className="profil-success">{success}</div>}
      <button type="submit" disabled={pending}>
        {pending ? "Connexion..." : "Se connecter"}
      </button>
      <div style={{ textAlign: "center" }}>
        Pas encore de compte ?{" "}
        <button type="button" className="switch-link" onClick={onSwitch}>Créer un compte</button>
      </div>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError(""); setSuccess(""); setPending(true);
    const { error } = await supabase.auth.signUp({
      email, password: pw, options: { data: { name } }
    });
    setPending(false);
    if (error) return setError("Erreur : " + error.message);
    setSuccess("Compte créé ! Vérifiez vos emails pour valider votre inscription.");
  }

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Nom complet"
        value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Adresse email"
        value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe"
        value={pw} onChange={e => setPw(e.target.value)} required />
      {error && <div className="profil-error">{error}</div>}
      {success && <div className="profil-success">{success}</div>}
      <button type="submit" disabled={pending}>
        {pending ? "Création..." : "Créer le compte"}
      </button>
      <div style={{ textAlign: "center" }}>
        Déjà inscrit ?{" "}
        <button type="button" className="switch-link" onClick={onSwitch}>Se connecter</button>
      </div>
    </form>
  );
}


