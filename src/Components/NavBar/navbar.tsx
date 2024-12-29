import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, MenuItem, Container, Box, Typography } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { SiTiktok } from "react-icons/si";
import { NavLink } from "react-router-dom";
import "./navbar.css";

// Liste des éléments du menu de navigation
const nav = [
  { title: "Accueil", path: "/accueil" },
  { title: "Créations de l'Atelier", path: "/creations-atelier" },
  { title: "Galerie d'exposition", path: "/galerie-exposition" },
  { title: "Locations", path: "/locations" },
  { title: "Me contacter", path: "/me-contacter" },
];

// Liste des icônes de profil
const icon = [
  {
    title: "Mon profil",
    path: "/connexion",
    icon: process.env.PUBLIC_URL + "/Images/profil.webp",
  },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#e7e2e1", paddingTop:"50px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Menu Burger */}
        <IconButton
          aria-label="menu"
          onClick={handleMenuOpen}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon sx={{ fontSize: "30px", color: "black" }} />
        </IconButton>

        {/* Titre */}
        <Typography
          color="black"
          variant="h1"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "4rem", lg: "5rem" },
          }}
        >
          L'Atelier d'Onirium
        </Typography>

        {/* Icône de profil */}
        {icon.map((item) => (
          <IconButton
            key={item.path}
            component={NavLink}
            to={item.path}
          >
            <img
              src={item.icon}
              alt={item.title}
              className="icon"
            />
          </IconButton>
        ))}
      </Toolbar>

      <hr className="hr-title" />

      {/* Menu Mobile */}
      {menuOpen && (
        <Box
          sx={{
            paddingTop: "80px",
            position: "fixed",
            paddingBottom: { xs: "50px", sm: "30px", md: "20px" }, // Padding spécifique pour mobile, tablette et bureau
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#e7e2e1",
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {nav.map((item) => (
            <MenuItem key={item.path} onClick={handleMenuClose}>
              <NavLink
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "1.2rem",
                  padding: "5px",
                }}
              >
                {item.title}
              </NavLink>
            </MenuItem>
          ))}

          <Box sx={{ marginTop: "20px", display: "flex", gap: 2 }}>
            <IconButton
              component="a"
              href="https://www.facebook.com/latelierdonirium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook sx={{ fontSize: 30, color: "black" }} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.instagram.com/latelierdonirium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram sx={{ fontSize: 30, color: "black" }} />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.tiktok.com/@latelierdonirium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiTiktok style={{ fontSize: 30, color: "black" }} />
            </IconButton>
          </Box>

          <IconButton
            aria-label="close-menu"
            onClick={handleMenuClose}
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              fontSize: "30px",
              color: "black",
            }}
          >
            X
          </IconButton>
        </Box>
      )}

      {/* Menu Desktop */}
      <Container sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", paddingTop: "20px" , paddingBottom:"30px"}}>
        <Box component="nav">
          <ul style={{ display: "flex", padding: 0, listStyle: "none" }}>
            {nav.map((item) => (
              <li key={item.path} style={{ padding: "20px", fontSize: "1.5rem" }}>
                <NavLink to={item.path} style={{ textDecoration: "none", color: "black" }}>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </Box>
      </Container>
    </AppBar>
  );
}
