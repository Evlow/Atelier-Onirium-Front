import Grid2 from "@mui/material/Grid2";
import { Creation } from "../../Models/Creations";
import CreationCard from "./CreationCard";
import "./CreationList.css";

interface Props {
  creations: Creation[];
}

// Export du composant CreationList
export default function CreationList({ creations }: Props) {
  return (
    <Grid2 container spacing={4}>
      {creations.map((creation) => (
        <Grid2 key={creation.id} size={{ xs: 2, sm: 4, md: 4 }}>
          <CreationCard creation={creation} />        </Grid2>
      ))}
    </Grid2>
  );
}
