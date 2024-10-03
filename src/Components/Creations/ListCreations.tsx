import { Creation } from "../../Models/Creations";
import { Link } from "react-router-dom";
import CardCreation from "./CardCreation";

interface Props {
  creations: Creation[];
}

// Export du composant ListCreations
export default function ListCreations({ creations }: Props) {
  const AllCreation = creations;

  return (
    <div className="container-recipes">
      {AllCreation.map((creation, index) => (
        <Link to={`/sheet-recipe/${creation.Id}`} key={creation.Id}>
          <CardCreation creation={creation} />{" "}
          {/* Composant de card de recette */}
          {(index + 1) % 3 === 0 && <div className="clearfix"></div>}
        </Link>
      ))}
    </div>
  );
}
