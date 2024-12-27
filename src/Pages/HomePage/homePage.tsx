import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/Banniere.webp";
import Footer from "../../Components/Footer/footer";
import { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Home from "../../Assets/home.jpg";
import Arabesque1 from "../../Assets/Arabesque1.svg";
import Arabesque2 from "../../Assets/Arabesque2.svg";
import Engrenage from "../../Assets/engrenage.svg";
import Engrenage1 from "../../Assets/engrenage1.svg";

import creation from "../../Assets/creation.jpg";
import HomePageCarrousel from "../../Components/Carrousel/HomePageCarrousel";
import { useAppDispatch, useAppSelector } from "../../App/Store/configureStore";
import { fetchCreationsAsync } from "../../Components/Creations/creationSlice";
import { Link } from "react-router-dom"; // Importer Link de react-router-dom

export default function HomePage() {
  const { creationsLoaded } = useAppSelector((state) => state.creation);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (!creationsLoaded) dispatch(fetchCreationsAsync());
  }, [creationsLoaded, dispatch]);

  return (
    <div>
      <NavBar />
      <Banners imgBanner={imgBanners} />

      {/* Section principale */}
      <Box
        component="main"
        sx={{ width: "80%", margin: "0 auto", paddingY: 4 }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            padding: "20px",
            fontSize: { xs: "3rem", md: "5rem" },
          }}
        >
          L'Atelier d'Onirium, la création au-delà du réel
        </Typography>

        <Stack
          component="article"
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1" sx={{ flex: 1, textAlign: "justify" }}>
            L'Atelier d'Onirium est avant tout un lieu où l'imagination prend
            vie à travers des projets variés et originaux. Mon approche repose
            sur un mélange d'artisanat traditionnel et de technologies modernes
            pour créer des expériences qui marquent les esprits.
            <br />
            <br />
            En tant qu'artiste polyvalente, je m'adapte à chaque projet avec une
            attention particulière aux détails, que ce soit pour des escape
            games immersifs où les joueurs vivent des aventures uniques, des
            animatroniques réalistes qui ajoutent une dimension vivante à des
            décors, ou encore des objets en bois gravés et découpés qui
            apportent une touche personnelle à votre intérieur.
            <br />
            <br />
            Mon univers est atypique, influencé par le fantastique, et j'aime
            repousser les limites de ce qui est possible. Chaque création, qu'il
            s'agisse de décors grandeur nature, d'impressions 3D, ou d'éléments
            sur mesure comme des mugs personnalisés, est conçue pour sortir de
            l'ordinaire et offrir une expérience visuelle et sensorielle unique.
            <br />
            <br />
            Mon objectif est de vous inviter à rêver, à explorer des mondes
            nouveaux, tout en redéfinissant les codes de la créativité et de
            l'innovation.
          </Typography>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src={Home}
              alt="L'Atelier d'Onirium"
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "#E7E2E1",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "45%" },
            m: "50px auto",
            textAlign: "center",
          }}
        >
          {/* Engrenage image */}
          <Box
            component="img"
            src={Engrenage1}
            alt="Engrenage gauche"
            sx={{
              position: "absolute", // Position it within the container
              top: "-120px",
              left: "-115px", // Move it to the left side (use negative value to position it outside)
              width: { xs: "400px", sm: "450px", md: "550px" }, // Make width responsive
              height: { xs: "400px", sm: "450px", md: "550px" }, // Make height responsive
              opacity: 0.2,
              overflow: "hidden", // Ensure no overflow
              transform: "rotate(33deg)", // Optional rotation
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "5rem", sm: "6rem", md: "7rem" }, // Adjusts the font size based on screen size
              color: "black",
            }}
          >
            Ne manquez rien
          </Typography>

          <Typography variant="body1" sx={{ padding: "10px", color: "black" }}>
            Suivez L'Atelier d'Onirium sur les réseaux sociaux pour plonger dans
            l'univers de mes créations et ainsi ne rien manquer de mes dernières
            nouveautés !
          </Typography>
        </Box>

        <Grid container justifyContent="center" spacing={2}>
          {socialLinks.map((link) => (
            <Grid item key={link.name}>
              <IconButton
                component="a"
                href={link.url}
                target="_blank"
                aria-label={link.name}
                sx={{
                  color: "black",
                  width: 65,
                  height: 65,
                  zIndex: 2, // Ensure the icons are on top
                  position: "relative",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Box
                  component="img"
                  src={link.icon}
                  alt={link.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </IconButton>
            </Grid>
          ))}
        </Grid>

        {/* Engrenage image */}
        <Box
          component="img"
          src={Engrenage}
          alt="Engrenage droit"
          sx={{
            position: "absolute", // Position it within the container
            bottom: "-115px",
            right: "-115px", // Move it to the left side (use negative value to position it outside)
            width: { xs: "400px", sm: "450px", md: "600px" }, // Make width responsive
            height: { xs: "450px", sm: "450px", md: "650px" }, // Make height responsive
            opacity: 0.2,
            overflow: "hidden", // Ensure no overflow
            transform: "rotate(-60deg)", // Optional rotation
          }}
        />
      </Box>

      {/* Carrousel */}
      <HomePageCarrousel />
      {/* Citation */}
      <Stack
        component="article"
        justifyContent="center"
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
        sx={{ marginTop: "70px", marginBottom: "70px" }}
      >
        <Box>
          <img src={Arabesque1} alt="Arabesque 1" height="40px" />
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontFamily: "Alice",
            textAlign: "center",
            fontSize: { xs: "1rem", md: "2rem" },
          }}
        >
          Créer quelque chose d'unique, c'est donner vie à une idée qui
          n'existait nulle part ailleurs.
        </Typography>
        <Box>
          <img src={Arabesque2} alt="Arabesque 2" height="40px" />
        </Box>
      </Stack>

      {/* Section Création Unique */}
      <Box component="main" sx={{ width: "80%", margin: "0 auto", mt: 4 }}>
        <Stack
          component="article"
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img
              src={creation}
              alt="Création unique"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                textAlign: "left",
                fontSize: { xs: "3rem", md: "4rem" },
                marginBottom: "20px",
              }}
            >
              Les Créations de l'Atelier
            </Typography>

            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Mon univers est atypique, influencé par le fantastique, et j'aime
              repousser les limites de ce qui est possible. Chaque création,
              qu'il s'agisse de décors grandeur nature, d'impressions 3D, ou
              d'éléments sur mesure comme des mugs personnalisés, est conçue
              pour sortir de l'ordinaire et offrir une expérience visuelle et
              sensorielle unique.
              <br />
              <br />
              Mon objectif est de vous inviter à rêver, à explorer des mondes
              nouveaux, tout en redéfinissant les codes de la créativité et de
              l'innovation.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                component={Link}
                to="/creations-atelier"
                sx={{
                  width: "25%",
                  backgroundColor: "#E7E2E1",
                  color: "black",
                  margin: "5px",
                  fontFamily: "Alice",
                  fontSize: "1.2rem",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                Découvrir{" "}
                <span style={{ color: "#640a02", marginLeft: "5px" }}>
                  &gt;
                </span>
              </Button>
            </Box>
          </Box>
        </Stack>

        {/* Section gallerie expo */}
        <Stack
          component="article"
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ marginTop: "50px" }}
        >
          {/* Conteneur pour le titre et la description */}
          <Box component="section" flex={1}>
            {/* Titre "Galerie Expo" */}
            <Typography
              variant="h2"
              sx={{
                textAlign: "left",
                fontSize: { xs: "3rem", md: "4rem" },
                marginBottom: "20px",
              }}
            >
              La Galerie d'Exposition
            </Typography>

            {/* Texte galerie exposition */}
            <Typography
              component="section"
              variant="body1"
              sx={{
                textAlign: "center",
              }}
            >
              Mon univers est atypique, influencé par le fantastique, et j'aime
              repousser les limites de ce qui est possible. Chaque création,
              qu'il s'agisse de décors grandeur nature, d'impressions 3D, ou
              d'éléments sur mesure comme des mugs personnalisés, est conçue
              pour sortir de l'ordinaire et offrir une expérience visuelle et
              sensorielle unique.
              <br />
              <br />
              Mon objectif est de vous inviter à rêver, à explorer des mondes
              nouveaux, tout en redéfinissant les codes de la créativité et de
              l'innovation.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                component={Link}
                to="/galerie-exposition"
                sx={{
                  width: "25%",
                  backgroundColor: "#E7E2E1",
                  color: "black",
                  margin: "5px",
                  fontFamily: "Alice",
                  fontSize: "1.2rem",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  marginTop: "50px",
                }}
              >
                Découvrir
                <span style={{ color: "#640a02", marginLeft: "5px" }}>
                  &gt;
                </span>
              </Button>
            </Box>
          </Box>
          {/* Image galerie expo */}
          <Box
            component="section"
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={creation}
              alt="Galerie Exposition"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Box>
        </Stack>
      </Box>
      <Footer />
    </div>
  );
}
