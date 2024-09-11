import React from "react";
import { NavLink } from "react-router-dom";

const nav = [
    { title: "ACCUEIL", path: "/accueil" },
    { title: "CRÉATIONS DE L'ENTREPRISE", path: "creations-entreprise" },
    { title: "GALERIE D'EXPOSITION", path: "/galerie-exposition" },

  ];

  export default function NavBar() {
    return (
      <><div>
        {/* <Logo></Logo> */}
      </div><div className="nav">
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
        </div></>
    );
  }



