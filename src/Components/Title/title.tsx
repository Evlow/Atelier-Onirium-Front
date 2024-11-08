import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import { useAtelierContext } from "../../App/Context/context";
import "./title.css"; 
import { useAppSelector } from "../../App/Store/configureStore";

const icon = [
  {
    title: "Mon panier",
    path: "/Basket/GetBasket",
    icon: process.env.PUBLIC_URL + "/Images/panier.webp", 
  },
  {
    title: "Mon profil",
    path: "/Profile",
    icon: process.env.PUBLIC_URL + "/Images/profil.webp", 
  },
];

export default function Title() {
  // Récupère le contexte de l'Atelier, qui inclut les informations du panier
  const { basket } = useAppSelector(state => state.basket);
// Calcule le nombre total d'articles dans le panier en additionnant les quantités de chaque article
// Si le panier est vide ou indéfini, le total des articles sera de 0 par défaut
const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <AppBar position="static" className="appbar" color="transparent">
  <Toolbar>
    <Typography fontFamily="Love Light" color="black" variant="h1" component="div" sx={{ flexGrow: 1 }} className="title">
      L'Atelier d'Onirium
    </Typography>

    {icon.map((item, index) => (
      <IconButton
        key={item.path}
        component={NavLink}
        to={item.path}
      >
        {index === 0 ? (
          <Badge overlap="circular" 
            badgeContent={itemCount}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#640a02", 
                color: "white", 
                width: "20px", 
                height: "20px",               },
            }}
          >
            <img src={item.icon} alt={item.title} className="icon" />
          </Badge>
        ) : (
          <img src={item.icon} alt={item.title} className="icon" />
        )}
      </IconButton>
    ))}
  </Toolbar>
  <hr className="hr-title"/>
</AppBar>

    
  );
}
