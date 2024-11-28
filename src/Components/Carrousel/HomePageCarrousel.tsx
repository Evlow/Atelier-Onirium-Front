import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import agent from "../../App/Api/agent";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePageCarrousel() {
  const [creations, setCreations] = useState<Creation[]>([]);

  useEffect(() => {
    const fetchCreations = async () => {
      try {
        const creationsData = await agent.Creations.list();
        setCreations(creationsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des créations:", error);
      }
    };

    fetchCreations();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h2"
        color="white"
        fontFamily="Lovers"
        sx={{
          textAlign: "left",
          fontSize: { xs: "3em", md: "6em" },
        }}
      >
        Les dernières créations
      </Typography>

      {/* Conteneur avec défilement horizontal */}
      <div
        style={{
          display: "flex",
          overflowX: "auto", // Permet le défilement horizontal
          gap: "10px", // Espace entre les éléments
          paddingBottom: "10px", // Pour ne pas cacher le scroll en bas
          scrollbarWidth: "none", // Masque la barre de défilement pour Firefox
          msOverflowStyle: "none", // Masque la barre de défilement pour IE et Edge
        }}
      >
        {creations.map((creation) => (
          <Link
            key={creation.id}
            to={`/creations/${creation.id}`}
            style={{ textDecoration: "none", flexShrink: 0 }} // Evite que les éléments rétrécissent
          >
            <Card
              sx={{
                width: 300, // Largeur fixe des cartes
                backgroundColor: "transparent",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={creation.pictureUrl}
                  alt={creation.name}
                  sx={{
                    objectFit: "cover",
                  }}
                />
              </CardActionArea>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
