import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from"../../Assets/Banniere.jpg"

export default function HomePage() {
    return (
      <div>
      <NavBar></NavBar>
      <Banners imgBanner={imgBanners} />

      </div>
    );
  }