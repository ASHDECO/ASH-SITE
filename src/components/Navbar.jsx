import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/quisuisje", label: "Qui suis-je ?" },
    { to: "/galerie", label: "Galerie" },
    { to: "/panier", label: "Panier" },
    { to: "/profil", label: "Mon compte" }
  ];

  function close() {
    setOpen(false);
  }

  return (
    <nav className="main-navbar">
      <div className="navbar-title">
        <Link to="/" style={{ textDecoration: "none", color: "#c2a755" }}>
          <span className="art-logo">🎨</span>
          ASH Déco 🖌️​
        </Link>
      </div>
      <div className="navbar-links-desktop">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={
              location.pathname === link.to ? "navbar-link active" : "navbar-link"
            }
            style={{
              fontWeight: location.pathname === link.to ? 700 : 500,
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="navbar-burger-icon">
        <button
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* MENU BURGER MOBILE */}
      {open &&
        <div className="navbar-burger-menu">
          <button
            aria-label="Fermer le menu"
            onClick={close}
            className="burger-close"
          >×</button>
          <div className="navbar-burger-list">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={
                  location.pathname === link.to ? "navbar-link active" : "navbar-link"
                }
                onClick={close}
                style={{
                  width: "100%",
                  padding: "18px 0",
                  fontSize: 20,
                  fontWeight: location.pathname === link.to ? 700 : 500,
                  borderBottom: location.pathname === link.to ? "2.5px solid #c2a755" : "none"
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      }

      {/* STYLE INJECTÉ */}
      <style>{`
        .main-navbar {
          width: 100vw;
          background: #11131c;
          color: #fff;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 2px 14px #0003;
          border-bottom: 2.5px solid #c2a75523;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0;
          min-height: 62px;
        }
        .navbar-title {
          font-weight: bold;
          font-size: 22px;
          padding: 0.45em 0.7em 0.45em 2vw;
          letter-spacing: 1.5px;
        }
        .navbar-title .art-logo {
          font-size: 1.5em;
          margin-right: 9px;
          vertical-align: middle;
        }
        .navbar-links-desktop {
          display: flex;
          gap: 25px;
          padding-right: 2vw;
        }
        .navbar-link {
          color: #fff;
          font-weight: 500;
          font-size: 16.2px;
          border-radius: 12px;
          padding: 7px 18px;
          transition: background .18s, color .15s;
          border: none;
        }
        .navbar-link.active,
        .navbar-link:hover {
          background: #c2a75533;
          color: #c2a755;
        }
        .navbar-burger-icon {
          display: none;
        }
        .navbar-burger-icon button {
          background: none;
          border: none;
          color: #c2a755;
          font-size: 32px;
          cursor: pointer;
          padding: 0 1vw 0 1vw;
        }
        /* Responsive */
        @media (max-width: 900px) {
          .navbar-links-desktop { gap: 6px; }
          .navbar-title { font-size: 18px; }
        }
        @media (max-width: 720px) {
          .navbar-links-desktop { display: none !important; }
          .navbar-burger-icon { display: block !important; }
          .main-navbar { min-height: 52px; }
        }
        /* BURGER */
        .navbar-burger-menu {
          position: fixed;
          top: 0; right: 0;
          height: 100vh;
          width: 86vw;
          max-width: 320px;
          background: #11131c;
          box-shadow: -2px 0 32px #0008;
          z-index: 99;
          display: flex;
          flex-direction: column;
          align-items: start;
          padding: 3.2em 2.1em 1.3em 1.3em;
          min-width: 140px;
          animation: slideIn .21s cubic-bezier(.8,.12,.6,1);
          border-left: 2px solid #c2a75544;
        }
        .navbar-burger-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-top: 14px;
        }
        .burger-close {
          background: none;
          border: none;
          color: #c2a755;
          font-size: 35px;
          position: absolute;
          top: 14px;
          right: 23px;
          cursor: pointer;
        }
        @keyframes slideIn {
          from { transform: translateX(120px); opacity: 0.7; }
          to   { transform: translateX(0);     opacity: 1; }
        }
      `}</style>
    </nav>
  );
}

