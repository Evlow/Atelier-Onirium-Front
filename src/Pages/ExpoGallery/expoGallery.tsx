import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/galerie.jpg";
import Footer from "../../Components/Footer/footer";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import agent from "../../App/Api/agent";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function ExpoGallery() {
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
    <>
      <NavBar></NavBar>
      <Banners imgBanner={imgBanners} />
      <Grid container spacing={2} alignItems="center">
        {creations.map((creation) => {
          const firstImage = Array.isArray(creation.pictureUrls)
            ? creation.pictureUrls[0]
            : creation.pictureUrls;

          return (
            <Grid item key={creation.id} xs={12} sm={6} md={4} lg={3}>
              <Link to={`/creations/${creation.id}`} style={{ textDecoration: "none" }}>
                <Card
                  sx={{
                    marginTop:"30px",
                    borderRadius: 0,
                    backgroundColor: "#e7e2e1",
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={firstImage}
                      alt={creation.name}
                      sx={{
                        objectFit: "cover",
                        height: { xs: "350px", sm: "400px", md: "500" },  
                      }}
                    />
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <Footer></Footer>
    </>
  );
}
