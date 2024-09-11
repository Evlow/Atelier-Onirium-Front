import "./banners.css";

interface Props {
  imgBanner: string;
}
export default function Banners(Props: Props) {
  return (
    <div className="banner">
      <img src={Props.imgBanner} alt="" />
    </div>
  );
}
