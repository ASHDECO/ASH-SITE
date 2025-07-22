import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate("/profil");
    }
    setLoading(false);
  }

  return (
    <div style={{
      maxWidth: 380, margin: "4em auto",
      background: "#fff", padding: "2em 2em 1.3em 2em",
      borderRadius: 18, boxShadow: "0 3px 18px #2232"
    }}>
      <h2 style={{ textAlign: "center" }}>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email" required placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password" required placeholder="Mot de passe"
          value={password} onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button
          type="submit" disabled={loading}
          style={{
            ...btnStyle,
            background: "#3341c2", color: "#fff", marginTop: 20, width: "100%"
          }}
        >{loading ? "Connexion..." : "Se connecter"}</button>
        {error && <div style={{ color: "crimson", marginTop: 14, fontSize: 15 }}>{error}</div>}
        <div style={{ marginTop: 14, textAlign: "center" }}>
          <span style={{ color: "#666" }}>Pas de compte ? </span>
          <Link to="/register" style={{ color: "#3341c2", textDecoration: "underline" }}>Créer un compte</Link>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "0.7em 1em", borderRadius: 8, border: "1px solid #ccc",
  marginBottom: 18, fontSize: 16
};

const btnStyle = {
  border: "none", borderRadius: 8, padding: "0.7em 1em", fontWeight: 600, fontSize: 17, cursor: "pointer"
};
