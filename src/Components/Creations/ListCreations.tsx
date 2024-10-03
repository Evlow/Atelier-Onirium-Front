import { Creation } from "../../Models/Creations";
import CardCreation from "./CardCreation";
import "./ListCreation.css";
interface Props {
  creations: Creation[];
}

// Export du composant ListCreations
export default function ListCreations({ creations }: Props) {
  return (
    <div className="container-recipes">
      {creations.map((creation, index) => (
        <div key={`${creation.id}-${index}`}>
          <CardCreation creation={creation} />
          <div className="clearfix"></div>
        </div>
      ))}
    </div>
  );
}
