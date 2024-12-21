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
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column", // Affiche la principale au-dessus des autres
            gap: 3,
          }}
        >
          {/* Image principale */}
          <Box
            component="img"
            src={creation.pictureUrl}
            alt={creation.name}
            sx={{
              width: "500px",
              height: "auto",
              objectFit: "cover",
              border: "2px solid #ccc",
              borderRadius: "8px",
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
                  width: "150px",
                  height: "auto",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Text Section */}
        <Box sx={{ flex: 1, textAlign: "justify", padding: "20px" }}>
          <Typography variant="h2" gutterBottom sx={{ marginBottom: 2 }}>
            {creation.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8, width: "95%" }}
          >
            {creation.description}
          </Typography>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
