import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import agent from "../../App/Api/agent";
import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import './HomePageCarrousel.css';

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
        fontFamily="Lovers"
        sx={{
          textAlign: "left",
          fontSize: { xs: "4rem", md: "6rem" },
        }}
      >
        Les dernières créations
      </Typography>

      {/* Conteneur avec défilement horizontal */}
      <div className="carousel-container">
        {creations.map((creation) => {
          // Si `creation.pictureUrls` est un tableau, on prend la première image
          const firstImage = Array.isArray(creation.pictureUrls)
            ? creation.pictureUrls[0]
            : creation.pictureUrls; // Si ce n'est pas un tableau, on utilise l'URL telle quelle

          return (
            <Link
              key={creation.id}
              to={`/creations/${creation.id}`}
              style={{ textDecoration: "none", flexShrink: 0 }} // Empêche la rétrécissement des éléments
            >
              <Card className="carousel-card">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={firstImage} // Utilisation de la première image
                    alt={creation.name}
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                  {/* Titre qui apparaît au survol */}
                  <div className="carousel-title" >
                    {creation.name}
                  </div>
                </CardActionArea>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
