import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchCreationAsync(+id!));
  }, [dispatch, id]);

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
            width: "500px", // Contrôle la largeur de l'image principale
          }}
        >
          {/* Image principale */}
          <Box
            component="img"
            src={creation.pictureUrl}
            alt={creation.name}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: 2, // Arrondir les bords de l'image si nécessaire
            }}
          />

          {/* Images supplémentaires */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // Si trop d'images, elles passent à la ligne
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
                  width: "100px", // Réduire la taille des images supplémentaires
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: 2, // Arrondir les bords des images supplémentaires
                }}
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
          <Typography variant="h3" gutterBottom sx={{ marginBottom: 2 }}>
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
        </Box>
      </Box>
      <Footer />
    </>
  );
}
