import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Creation } from "../../Models/Creations";
import "./CreationCard.css";
// Définition de l'interface Props
interface Props {
  // Instance de  (creation)
  creation: Creation;
}

const CreationCard: React.FC<Props> = ({ creation }) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={creation.pictureUrl}
          alt={creation.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {creation.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CreationCard;
