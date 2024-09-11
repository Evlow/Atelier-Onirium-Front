import Banners from "../../Components/Banners/banners";
import NavBar from "../../Components/NavBar/navbar";
import imgBanners from"../../Assets/Banniere.jpg"
import Footer from "../../Components/Footer/footer";

export default function HomePage() {
    return (
      <div>
      <NavBar></NavBar>
      <Banners imgBanner={imgBanners} />
      <Footer></Footer>

      </div>
    );
  }