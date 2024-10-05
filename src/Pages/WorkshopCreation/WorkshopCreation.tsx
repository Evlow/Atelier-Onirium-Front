import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/creation.webp";
import Footer from "../../Components/Footer/footer";
import { Creation } from "../../Models/Creations";
import { useEffect, useState } from "react";
import CreationList from "../../Components/Creations/CreationList";

export default function WorkshopCreation() {
  const [creations, setCreations] = useState<Creation[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Creation/GetCreations")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Erreur dans la réponse de l'API");
        }
        return response.json();
      })
      .then((data) => setCreations(data))
      .catch((error) => console.error("Erreur lors de la requête : ", error));
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <Banners imgBanner={imgBanners} />
      <CreationList creations={creations} />
      <Footer></Footer>
    </div>
  );
}
