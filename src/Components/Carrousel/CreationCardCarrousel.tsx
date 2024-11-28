import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Creation } from "../../Models/Creations";
import { useAtelierContext } from "../../App/Context/context";

// Définition de l'interface Props
interface Props {
  creation: Creation;
}

export default function CreationCardCarrousel({ creation }: Props) {
  useAtelierContext();

  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "auto",
        backgroundColor: "transparent",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={creation.pictureUrl}
          alt={creation.name}
          sx={{
            objectFit: "cover",
          }}
        />
      </CardActionArea>
    </Card>
  );
}
