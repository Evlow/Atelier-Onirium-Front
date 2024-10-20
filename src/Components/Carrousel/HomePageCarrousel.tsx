import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import agent from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./HomePageCarrousel.css";

import { Pagination } from "swiper/modules";
import CreationCardCarrousel from "./CreationCardCarrousel"; // Assurez-vous d'importer ce composant
import { Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";

export default function HomePageCarrousel() {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs

  useEffect(() => {
    const fetchCreations = async () => {
      try {
        const creationsData = await agent.Creations.list();
        setCreations(creationsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des créations:", error);
        setError("Une erreur s'est produite lors du chargement des créations."); // Gérer les erreurs
      } finally {
        setLoading(false);
      }
    };

    fetchCreations();
  }, []);

  // Si le chargement est en cours
  if (loading) {
    return (
      <LoadingComponent message="Chargement des créations, veuillez patienter..." />
    );
  }

  // Si une erreur est survenue
  if (error) {
    return <div>{error}</div>;
  }

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
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={true}
        modules={[Pagination]}
        className="Swiper"
      >
        {creations.map((creation) => (
          <SwiperSlide key={creation.id}>
            <CreationCardCarrousel creation={creation} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
