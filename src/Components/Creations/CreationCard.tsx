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

const CreationCard: React.FC<Props> = ({ creation }) => {
  return (
    <Card sx={{ maxWidth: 300, margin: "auto", backgroundSize: "contain" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={creation.pictureUrl}
          alt={creation.name}
          sx={{ objectFit: "cover" }} 
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textAlign="center" 
          >
            {creation.name}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            textAlign="center" // Texte centré
          >
            {creation.price}€
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CreationCard;
