import React, { useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import Title from "../Title/title";

// Déclaration d'un tableau d'objets représentant les liens de navigation
const nav = [
  { title: "ACCUEIL", path: "/accueil" },
  { title: "CRÉATIONS DE L'ATELIER", path: "/creations-atelier" },
  { title: "GALERIE D'EXPOSITION", path: "/galerie-exposition" },
  { title: "LOCATIONS", path: "/locations" },
  { path: "", icon: process.env.PUBLIC_URL + "/Images/panier.webp" },
  { path: "", icon: process.env.PUBLIC_URL + "/Images/profil.webp" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture du menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <Title />
      </div>
      <div className="nav">
        <div className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <nav className={`navbar ${isOpen ? "active" : ""}`}>
          <ul className="item-navbar">
            {/* Boucle sur chaque élément du tableau nav pour créer les liens de navigation */}
            {nav.map((item) => (
              <li key={item.path || item.title}>
                <NavLink to={item.path}>
                  {item.title}
                  {/* Si une icône est définie, elle est affichée à côté du texte */}
                  {item.icon && (
                    <img
                      src={item.icon}
                      alt={item.title || "Icone"}
                      className="icon"
                    />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
