import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/Banniere.jpg";
import Footer from "../../Components/Footer/footer";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import CreationList from "../../Components/Creations/CreationList";
import agent from "../../App/Api/agent";
import LoadingComponent from '../../Components/Laoding/laodingComponent';

export default function HomePage() {
  const [creations, setCreations] = useState<Creation[]>([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Creations.list().then(creations =>setCreations(creations))
    .catch(error=>console.log(error))
    .finally(() =>setLoading(false))
  }, [])

  if (loading) return <LoadingComponent message= "Chargement de la page en cours, veuillez patienter..."></LoadingComponent>
  return (
    <div>
      {/* <NavBarAdmin></NavBarAdmin>
      <Aside></Aside>
      <AboutPage></AboutPage> */}
      <NavBar></NavBar>
      <Banners imgBanner={imgBanners} />
      <CreationList creations={creations} />
      <Footer></Footer>
    </div>
  );
}
