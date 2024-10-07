import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/Banniere.jpg";
import Footer from "../../Components/Footer/footer";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import CreationList from "../../Components/Creations/CreationList";
import agent from "../../App/Api/agent";
import Aside from '../../Admin/Aside/aside';

export default function HomePage() {
  // const [creations, setCreations] = useState<Creation[]>([]);

  // useEffect(() => {
  //   agent.Creations.list().then(creations =>setCreations(creations))
  // }, [])
  return (
    <div>
      <Aside></Aside>
      {/* <NavBar></NavBar>
      <Banners imgBanner={imgBanners} />
      <CreationList creations={creations} />

      <Footer></Footer> */}
    </div>
  );
}
