import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/Banniere.webp";
import Footer from "../../Components/Footer/footer";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import CreationList from "../../Components/Creations/CreationList";
import agent, { creationSelectors } from "../../App/Api/agent";
import LoadingComponent from "../../Components/Laoding/laodingComponent";
import { Box, Stack, Typography } from "@mui/material";
import Home from "../../Assets/home.jpg";
import Arabesque1 from "../../Assets/Arabesque1.svg";
import Arabesque2 from "../../Assets/Arabesque2.svg";
import creation from "../../Assets/creation.jpg";
import HomePageCarrousel from "../../Components/Carrousel/HomePageCarrousel";
import { useAppDispatch, useAppSelector } from "../../App/Store/configureStore";
import { fetchCreationsAsync } from "../../Components/Creations/creationSlice";

export default function HomePage() {
const {creationsLoaded, status} =useAppSelector(state=>state.creation);
const dispatch = useAppDispatch();

  useEffect(() => {
    if(!creationsLoaded) dispatch(fetchCreationsAsync());
  }, [creationsLoaded, dispatch]);

if (status.includes('pending')) return <LoadingComponent message= "Chargement des créations"/> 
  return (
    <div>
      <NavBar />
      <Banners imgBanner={imgBanners} />

      {/* Section principale */}
      <Box width="80%" margin="0 auto">
        {/* Titre principal */}
        <Typography
          variant="h2"
          color="white"
          fontFamily="Lovers"
          sx={{
            textAlign: "center",
            fontSize: { xs: "3em", md: "6em" },
            padding: "20px"
          }}
        >
          L'Atelier d'Onirium, la création au-delà du réel
        </Typography>

        {/* Section de présentation */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Texte présentation */}
          <Typography
            component="div"
            variant="body1"
            sx={{
              color: "white",
              fontFamily: "Gowun",
              flex: 1,
              textAlign: "justify",
            }}
          >
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

          {/* Image présentation */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Home}
              alt="L'Atelier d'Onirium"
              style={{
                maxWidth: "80%",
                height: "auto",
              }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Citation */}
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{ marginTop: "70px", marginBottom: "70px" }}
      >
        <Box>
          <img src={Arabesque1} alt="Arabesque 1" height="40px" />
        </Box>
        <Typography
          component="div"
          variant="h3"
          sx={{
            color: "white",
            fontFamily: "Lovers",
            textAlign: "center",
            fontSize: { xs: "2.5em", md: "3.5em" },
          }}
        >
          Créer quelque chose d'unique, c'est donner vie à une idée qui
          n'existait nulle part ailleurs.
        </Typography>
        <Box>
          <img src={Arabesque2} alt="Arabesque 2" height="50px" />
        </Box>
      </Stack>

      <HomePageCarrousel></HomePageCarrousel>
      <Box width="80%" margin="0 auto">
        {/* Section création unique */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ marginTop: "50px" }}
        >
          {/* Image création unique */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={creation}
              alt="Création unique"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Box>

          {/* Conteneur pour le titre et la description */}
          <Box flex={1}>
            {/* Titre "Création Atelier" */}
            <Typography
              variant="h2"
              color="white"
              fontFamily="Lovers"
              sx={{
                textAlign: "left",
                fontSize: { xs: "3em", md: "6em" },
                marginBottom: "20px",
              }}
            >
              Les Créations de l'Atelier
            </Typography>

            {/* Texte création atelier */}
            <Typography
              component="div"
              variant="body1"
              sx={{
                color: "white",
                fontFamily: "Gowun",
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
          </Box>
        </Stack>
        {/* Section gallerie expo */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
          sx={{ marginTop: "50px" }}
        >
          {/* Conteneur pour le titre et la description */}
          <Box flex={1}>
            {/* Titre "Galerie Expo" */}
            <Typography
              variant="h2"
              color="white"
              fontFamily="Lovers"
              sx={{
                textAlign: "left",
                fontSize: { xs: "3em", md: "6em" },
                marginBottom: "20px",
              }}
            >
              La Galerie d'Exposition
            </Typography>

            {/* Texte galerie exposition */}
            <Typography
              component="div"
              variant="body1"
              sx={{
                color: "white",
                fontFamily: "Gowun",
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
          </Box>
          {/* Image galerie expo */}
          <Box
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