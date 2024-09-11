import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from "../../Assets/Creations.png"


export default function WorkshopCreation() {
    return (
      <div>
      <NavBar></NavBar>
      <Banners imgBanner={imgBanners} />

      </div>
    );
  }