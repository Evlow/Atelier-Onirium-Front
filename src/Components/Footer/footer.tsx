import React from "react";
import { Box, Typography, Link as MuiLink, Grid, GlobalStyles } from "@mui/material";
import { NavLink } from "react-router-dom";

const footerLinks = [
  { title: "Me contacter", path: "/me-contacter" },
  { title: "Politique de confidentialité", path: "/politique-de-confidentialite" },
  { title: "CGV", path: "/CGV" },
];

const socialLinks = [
  {
    name: "facebook",
    url: "https://www.facebook.com/latelierdonirium",
    icon: process.env.PUBLIC_URL + "/Images/facebook.svg",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/latelierdonirium?igsh=MWF3Z2dyNzR5N2l0Yw==",
    icon: process.env.PUBLIC_URL + "/Images/instagram.svg",
  },
  {
    name: "tikTok",
    url: "https://www.tiktok.com/@latelierdonirium?_t=8pf3S8fZJab&_r=1",
    icon: process.env.PUBLIC_URL + "/Images/tiktok.svg",
  },
];

export default function Footer() {
  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: "#E7E2E1",
          padding: "20px 0",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="space-around"
          alignItems="center"
          sx={{
            backgroundColor: "#E7E2E1",
          }}
        >
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "3rem", sm: "4rem" },
                color: "black",
                marginBottom: "10px",
              }}
            >
              L'Atelier d'Onirium
            </Typography>
            <Box
              component="ul"
              sx={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                padding: 0,
                listStyle: "none",
              }}
            >
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <MuiLink
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "inline-block",
                      width: 40,
                      height: 40,
                    }}
                  >
                    <img
                      src={link.icon}
                      alt={link.name}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </MuiLink>
                </li>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Box component="ul" sx={{ listStyle: "none", padding: 0, margin: 0 }}>
              {footerLinks.map((item) => (
                <li
                  key={item.path}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <MuiLink
                    component={NavLink}
                    to={item.path}
                    sx={{
                      fontFamily: "Gowun",
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    {item.title}
                  </MuiLink>
                </li>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            backgroundColor: "#E7E2E1",
            textAlign: "center",
            borderTop: "1px solid #ddd",
            paddingTop: "10px",
            paddingBottom: "20px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "black",
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            &copy;
            <MuiLink
              href="https://www.linkedin.com/in/mathilde-peauger/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "black",
                textDecoration: "none",
                fontWeight: "bolder",
              }}
            >
              Mathilde PEAUGER
            </MuiLink>
            | Tous droits réservés.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
