import React from "react";
import "./navbar.css";

import { NavLink } from "react-router-dom";
import Title from "../Title/title";

// Déclaration d'un tableau d'objets représentant les liens de navigation
const nav = [
  { title: "ACCUEIL", path: "/accueil" }, 
  { title: "CRÉATIONS DE L'ATELIER", path: "/creations-atelier" }, 
  { title: "GALERIE D'EXPOSITION", path: "/galerie-exposition" }, 
  { title: "LOCATIONS", path: "/locations" }, 
  {
    path: "", 
    icon: process.env.PUBLIC_URL + "/Images/compte.png", 
  },
];

export default function NavBar() {
  return (
    <>
      <div>
        <Title />
      </div>
      <div className="nav">
        <nav className="navbar">
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
                      alt={item.title}
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
