import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import agent from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./HomePageCarrousel.css";

import { Pagination } from "swiper/modules";
import CreationCardCarrousel from "./CreationCardCarrousel"; 
import { Typography } from "@mui/material";
import "swiper/css";
import "swiper/css/pagination";
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
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        pagination={true}
        modules={[Pagination]}
        className="Swiper"
      >
        {creations.map((creation) => (
          <SwiperSlide key={creation.id}>
            <Link
              to={`/creations/${creation.id}`}
              style={{ textDecoration: "none" }}
            >
              <CreationCardCarrousel creation={creation} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
