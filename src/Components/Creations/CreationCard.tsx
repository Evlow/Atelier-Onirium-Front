import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Creation } from "../../Models/Creations";

// Définition de l'interface Props
interface Props {
  creation: Creation;
}

export default function CreationCard({ creation }: Props) {
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
          height="300" // Hauteur explicite de l'image
          image={creation.pictureUrl}
          alt={creation.name}
          sx={{
            objectFit: "cover", // L'image couvre l'espace disponible sans déformation
          }}
        />
        <CardContent sx={{ padding: 1 }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {creation.name}
          </Typography>
          <Typography
            component="div"
            sx={{
              fontSize: "1rem",
              fontWeight: "lighter",
              color: "white",
            }}
          >
            {/* {creation.price.toFixed(2)}€ */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
