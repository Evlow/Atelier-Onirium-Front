import Grid2 from "@mui/material/Grid2";
import { Creation } from "../../Models/Creations";
import CreationCard from "./CreationCard";
import { Link } from "react-router-dom";

interface Props {
  creations: Creation[];
}

// Export du composant CreationList
export default function CreationList({ creations }: Props) {
  return (
    <Grid2 container spacing={4}>
      {creations.map((creation) => (
        <Grid2 key={creation.id} size={{ xs: 9, sm: 6, md: 3 }}>
          <Link to={`${creation.id}`}>
            <CreationCard creation={creation} />
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
}
