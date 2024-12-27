import { Link, useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/footer";
import { creationSelectors } from "../../App/Api/agent";
import NotFound from "../../App/Errors/notFound";
import { useAppDispatch, useAppSelector } from "../../App/Store/configureStore";
import { fetchCreationAsync } from "./creationSlice";

export default function CreationDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const creation = useAppSelector((state) =>
    creationSelectors.selectById(state, +id!)
  );
  const [mainImage, setMainImage] = useState<string>("");

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
    dispatch(fetchCreationAsync(+id!));
  }, [dispatch, id]);

  useEffect(() => {
    if (creation?.pictureUrls?.length > 0) {
      setMainImage(creation.pictureUrls[0]); // Set the first image as the main image by default
    }
  }, [creation]);

  if (!creation) {
    return <NotFound />;
  }

  return (
    <>
      <NavBar />
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start", // Aligner les éléments au début de la ligne
          justifyContent: "space-between",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Affiche l'image principale au-dessus des autres
            gap: 3,
            width: "600px", // Contrôle la largeur de l'image principale
          }}
        >
          {/* Main Image */}
          <Box
            component="img"
            src={mainImage}
            alt={creation.name}
            sx={{
              width: "600px",
              height: "600px",
              objectFit: "cover",
              borderRadius: 2, // Arrondir les bords de l'image si nécessaire
            }}
          />

          {/* Additional Images (non-main images) */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
            }}
          >
            {creation.pictureUrls?.map((url, index) => (
              <Box
                key={index}
                component="img"
                src={url}
                alt={`Additional image ${index + 1}`}
                sx={{
                  width: "200px", // Set the width of the thumbnail images
                  height: "200px", // Set the height of the thumbnail images
                  objectFit: "cover",
                  borderRadius: 2,
                  cursor: "pointer", // Change cursor on hover to indicate clickability
                }}
                onClick={() => setMainImage(url)} // Change main image on click
              />
            ))}
          </Box>
        </Box>

        {/* Text Section */}
        <Box
          sx={{
            flex: 1,
            paddingLeft: 4, // Ajouter un peu d'espace entre l'image et le texte
            textAlign: "justify",
          }}
        >
          <Typography
            variant="h2"
            fontSize="6rem"
            gutterBottom
            sx={{ marginBottom: 2 }}
          >
            {creation.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-wrap", // Gérer les retours à la ligne dans la description
              lineHeight: 1.8,
              width: "95%", // Limiter la largeur du texte pour qu'il ne prenne pas trop de place
            }}
          >
            {creation.description}
          </Typography>

          {/* Button Section (Centré sous la description) */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <Button
              component={Link}  
              to="/me-contacter"     
              sx={{
                width: "20%",

                backgroundColor: "#E7E2E1",
                color: "black",
                fontFamily: "Alice",
                fontSize: "1.2rem",
                textTransform: "none",  
                display: "flex",
                alignItems: "center",
              }}
            >
              Me contacter <span style={{ color: "#640a02", marginLeft: "5px"}}>&gt;</span>
            </Button>
          </Box>
        </Box>
      </Box>
      <Typography variant="h2" textAlign="center" sx={{ marginBottom: 1 }}>
        Retrouvez mes créations sur mes réseaux sociaux !
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centrer les icônes
          gap: 2, // Espacement entre les icônes
          paddingBottom: 5,
        }}
      >
        {socialLinks.map((link) => (
         <IconButton
         component="a"
         href={link.url}
         target="_blank"
         aria-label={link.name} // Amélioration de l'accessibilité
         sx={{
           width: 60,
           height: 60,
           backgroundColor: "transparent", // Pour assurer qu'il n'y a pas de fond
           "&:hover": {
             backgroundColor: "transparent", // Suppression du fond au survol
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
             filter: "invert(1)", // Appliquer un filtre pour colorer l'icône en blanc
           }}
         />
       </IconButton>
        ))}
      </Box>
      <Footer />
    </>
  );
}
