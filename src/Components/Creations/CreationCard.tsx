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
  // Si `creation.pictureUrls` est un tableau, on récupère la première URL
  const firstImage = Array.isArray(creation.pictureUrls) 
    ? creation.pictureUrls[0] // Prendre la première image dans le tableau
    : creation.pictureUrls; // Si ce n'est pas un tableau, utiliser directement l'URL

  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "auto",
        backgroundColor: "#e7e2e1",
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
          image={firstImage} // Utiliser la première image ou l'unique URL
          alt={creation.name}
          sx={{
            objectFit: "cover", // L'image couvre l'espace disponible sans déformation
          }}
        />
        <CardContent sx={{ padding: "0" }}> {/* Réduction du padding */}
          <Typography
            gutterBottom
            variant="h4" // Taille de police ajustée pour réduire l'impact du titre
            component="div"
            sx={{
              padding:"10px",
              whiteSpace: "nowrap",
              fontSize: "2.5rem", // Réduire la taille du texte du titre
              fontFamily: "Lovers",
              textAlign: "center",
              overflow: "hidden", // Empêcher le texte de déborder
              textOverflow: "ellipsis", // Ajout d'un effet de coupure si 
            }}
          >
            {creation.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
