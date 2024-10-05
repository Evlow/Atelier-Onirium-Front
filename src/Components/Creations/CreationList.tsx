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
          <Grid2 key={creation.id} size= {{xs :9, sm:6, md:3}}>
            <CreationCard creation={creation} />
          </Grid2>
        ))}
      </Grid2>
  );
}
