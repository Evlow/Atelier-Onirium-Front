import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Creation } from "../../Models/Creations";
import { useState } from "react";
import agent from "../../App/Api/agent";
import { LoadingButton } from "@mui/lab";

// Définition de l'interface Props
interface Props {
  creation: Creation;
}

const CreationCard: React.FC<Props> = ({ creation }) => {
  const [loading, setLoading] = useState(false);
  function handleAddItem(creationId: number) {
    setLoading(true);
    agent.Basket.addItem(creationId,)
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
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
            {creation.price.toFixed(2)}€
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <LoadingButton loading={loading} onClick={() =>handleAddItem(creation.id)}size="small">Ajouter au panier</LoadingButton>
      </CardActions>
    </Card>
  );
};

export default CreationCard;
