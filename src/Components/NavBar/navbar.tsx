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
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false); // État pour gérer l'ouverture du menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="title-burger">
  <Title />
  <div className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <nav className={`navbar ${isOpen ? "active" : ""}`}>
    <ul className="item-navbar">
      {nav.map((item) => (
        <li key={item.path || item.title}>
          <NavLink to={item.path}>{item.title}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
</div>

    </>
  );
}
