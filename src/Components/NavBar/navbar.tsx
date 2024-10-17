import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Title from "../Title/title";
import "./navbar.css";

// Tableau d'objets représentant les liens de navigation
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
      <AppBar position="static" className="app-bar">
        <Toolbar className="toolbar">
          {/* Titre */}
          <Title />

          {/* Menu burger */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
            className="burger-button"
          >
            <MenuIcon />
          </IconButton>

          {/* Drawer pour le menu mobile */}
          <Drawer anchor="right" open={isOpen} onClose={toggleMenu}>
            <List className="drawer-list">
              {nav.map((item) => (
                <ListItem
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  onClick={toggleMenu}
                  className="nav-link"
                >
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}
