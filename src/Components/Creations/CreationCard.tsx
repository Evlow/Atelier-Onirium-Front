import {
  Card,
  CardActionArea,
  // CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Creation } from "../../Models/Creations";

// Définition de l'interface Props
interface Props {
  creation: Creation;
}

 export default function CreationCard({ creation } :Props){


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
      {/* <CardActions>
        <LoadingButton loading={status.includes('pendingAddItem' + creation.id)} onClick={() =>dispatch(addBasketItemAsync({creationId :creation.id}))}size="small">Ajouter au panier</LoadingButton>
      </CardActions> */}
    </Card>
  );
};

