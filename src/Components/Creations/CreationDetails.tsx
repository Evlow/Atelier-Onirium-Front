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
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Image Section */}
        <Box
          component="img"
          src={creation.pictureUrl}
          alt={creation.name}
          sx={{
            width: "500px", // Largeur de l'image
            height: "auto", // Hauteur ajustée automatiquement
            objectFit: "cover", // Maintient les proportions et recadre si nécessaire
            marginRight: 3, // Espacement entre l'image et le texte
          }}
        />

        {/* Text Section */}
        <Box sx={{ flex: 1, textAlign: "justify", padding:'20px'}}>
          <Typography variant="h2" gutterBottom sx={{ marginBottom: 2 }}>
            {creation.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8, width:"95%" }}
          >
            {creation.description}
          </Typography>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
