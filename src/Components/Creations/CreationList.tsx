import { Grid } from "@mui/material";
import { Creation } from "../../Models/Creations";
import CreationCard from "./CreationCard";
import { Link } from "react-router-dom";

interface Props {
  creations: Creation[];
}

export default function CreationList({ creations }: Props) {
  return (
    <Grid container spacing={4} padding="50px 0 50px 0"
    alignItems="center" >
     {creations.map((creation) => {
  return (
    <Grid key={creation.id} item xs={9} sm={6} md={3}>
      <Link to={`/creations/${creation.id}`} style={{ textDecoration: 'none' }}>
        <CreationCard creation={creation} />
      </Link>
    </Grid>
  );
})}
    </Grid>
  );
}

