import "./banners.css";

interface Props {
  imgBanner: string;
  textBanner? : string | null;
  positionText? : "center"
}
export default function Banners(Props: Props) {
  return (
    <div className="banner">
      <img src={Props.imgBanner} alt="image bannière" />
      <h2 className="h2-banner"style={{textAlign:Props.positionText}}>{Props.textBanner}</h2>
    </div>
  );
}
