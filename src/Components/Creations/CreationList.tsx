import { Grid } from "@mui/material";
import { Creation } from "../../Models/Creations";
import CreationCard from "./CreationCard";
import { Link } from "react-router-dom";

interface Props {
  creations: Creation[];
}

export default function CreationList({ creations }: Props) {
  return (
    <Grid
      container
      spacing={2} // Espace entre les cartes
      padding="50px 0"
      alignItems="center"
    >
      {creations.map((creation) => (
        <Grid
          key={creation.id}
          item
          xs={12} // Une carte par ligne sur les petits écrans
          sm={6}  // Deux cartes par ligne sur les écrans plus grands
          md={4}  // Trois cartes par ligne sur les écrans encore plus grands
          lg={3}  // Quatre cartes par ligne sur les très grands écrans
        >
          <Link to={`/creations/${creation.id}`} style={{ textDecoration: "none" }}>
            <CreationCard creation={creation} />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
