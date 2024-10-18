import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/Banniere.jpg";
import Footer from "../../Components/Footer/footer";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import CreationList from "../../Components/Creations/CreationList";
import agent from "../../App/Api/agent";
import LoadingComponent from "../../Components/Laoding/laodingComponent";
import { Box, Stack, Typography } from "@mui/material";
import Home from "../../Assets/home.jpg";
import Arabesque1 from "../../Assets/Arabesque1.svg";
import Arabesque2 from "../../Assets/Arabesque2.svg";

export default function HomePage() {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Creations.list()
      .then((creations) => setCreations(creations))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <LoadingComponent message="Chargement de la page en cours, veuillez patienter..."></LoadingComponent>
    );

  return (
    <div>
      <NavBar />
      <Banners imgBanner={imgBanners} />
      <Box width="80%" margin="0 auto">
        <Typography
          variant="h2"
          color="white"
          fontFamily="Lovers"
          sx={{
            margin: { xs: "10px", sm: "15px", md: "25px", lg: "25px" },
          }}
        >
          L'Atelier d'Onirium
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            margin: { xs: "10px", sm: "15px", md: "25px", lg: "25px" },
          }}
        >
          <Typography
            component="div"
            variant="body1"
            sx={{
              color: "white",
              fontFamily: "Gowun",
              flexBasis: "50%",
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
          <Box
            sx={{
              flexBasis: "50%",
            }}
          >
            <img
              src={Home}
              alt="L'Atelier d'Onirium"
              style={{
                maxWidth: "100%",
                height: "75%",
                marginLeft: "50px",
              }}
            />
          </Box>
        </Stack>

      </Box>
      <Stack justifyContent="center" direction="row" spacing="2">
        <Box>
          <img src={Arabesque1} alt="Arabesque1" height="50px" />
        </Box>
        <Typography
          component="div"
          variant="h3"
          sx={{
            color: "white",
            fontFamily: "Lovers",
            textAlign: "justify",
            margin: "0 auto",
          }}
        >
          Créer quelque chose d'unique, c'est donner vie à une idée qui
          n'existait nulle part ailleurs.
        </Typography>
        <Box>
          <img src={Arabesque2} alt="Arabesque2" height="50px" />
        </Box>
      </Stack>
      <Box width="80%" margin="0 auto">
      <CreationList creations={creations} />
      </Box>

      <Footer />
    </div>
  );
}
