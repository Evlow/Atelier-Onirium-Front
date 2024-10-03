import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/Banniere.jpg";
import Footer from "../../Components/Footer/footer";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import ListCreations from "../../Components/Creations/ListCreations";

export default function HomePage() {
  const [creations, setCreations] = useState<Creation[]>([]);

  useEffect(() => {
    fetch("http://localhost:5247/api/Creation/GetCreations")
      .then((response) => {
        console.log(response); // Ajouter ce log pour voir la réponse complète
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
      <Footer></Footer>
      <ListCreations creations={creations} />

    </div>
  );
}
