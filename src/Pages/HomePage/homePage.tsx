import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/Banniere.jpg";
import Footer from "../../Components/Footer/footer";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import CreationList from "../../Components/Creations/CreationList";
import agent from "../../App/Api/agent";
import LoadingComponent from "../../Components/Laoding/laodingComponent";
import { Typography } from "@mui/material";

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
      {/* <NavBarAdmin></NavBarAdmin>
      <Aside></Aside>
      <AboutPage></AboutPage> */}
      <NavBar></NavBar>
      <Banners imgBanner={imgBanners} />
      <Typography component="div" variant="body1" color="white" fontFamily="Gowun"   sx={{
    margin: { xs: '10px', sm: '20px', md: '30px', lg: '40px', border: "solid  #AD8A3D 2px" },
    padding: { xs: '5px', sm: '10px', md: '15px', lg: '20px' },
  }}>
        L'Atelier d'Onirium est avant tout un lieu où l'imagination prend vie à
        travers des projets variés et originaux. Mon approche repose sur un
        mélange d'artisanat traditionnel et de technologies modernes pour créer
        des expériences qui marquent les esprits. En tant qu'artiste
        polyvalente, je m'adapte à chaque projet avec une attention particulière
        aux détails, que ce soit pour des escape games immersifs où les joueurs
        vivent des aventures uniques, des animatroniques réalistes qui ajoutent
        une dimension vivante à des décors, ou encore des objets en bois gravés
        et découpés qui apportent une touche personnelle à votre intérieur. Mon
        univers est atypique, influencé par le fantastique, et j'aime repousser
        les limites de ce qui est possible. Chaque création, qu'il s'agisse de
        décors grandeur nature, d'impressions 3D, ou d'éléments sur mesure comme
        des mugs personnalisés, est conçue pour sortir de l'ordinaire et offrir
        une expérience visuelle et sensorielle unique. Mon objectif est de vous
        inviter à rêver, à explorer des mondes nouveaux, tout en redéfinissant
        les codes de la créativité et de l'innovation.
      </Typography>
      <CreationList creations={creations} />
      <Footer></Footer>
    </div>
  );
}
