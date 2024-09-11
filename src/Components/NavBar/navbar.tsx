import React from "react";
import "./navbar.css";

import { NavLink } from "react-router-dom";
import Title from "../Title/title";


const nav = [
    { title: "ACCUEIL", path: "/accueil" },
    { title: "CRÉATIONS DE L'ENTREPRISE", path: "/creations-entreprise" },
    { title: "GALERIE D'EXPOSITION", path: "/galerie-exposition" },
    { title: "LOCATIONS", path: "/locations" },


  ];

  export default function NavBar() {
    return (
      <><div>
        <Title></Title> 
      </div>
          <nav className="navbar">
            <ul className="item-button">
              {/* Afficher les liens de navigation */}
              {nav.map((item) => (
                <li key={item.path}>
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </>
    );
  }



