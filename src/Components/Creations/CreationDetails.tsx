import { useParams } from "react-router-dom";
import { Grid, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/footer";
import agent from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import NotFound from "../../App/Errors/notFound";
import { useAppDispatch } from "../../App/Store/configureStore";

export default function CreationDetails() {
  // const {basket, status} = useAppSelector(state =>state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [creation, setCreation] = useState<Creation | null>(null);
  const [loading, setLoading] = useState(true);
  
  // const item = basket?.items.find(i=>i.creationId === creation?.id);

  useEffect(() => {
    // Si id est valide, récupérer les détails de la création
    if (id) {
      agent.Creations.details(parseInt(id))
        .then((response) => {
          setCreation(response); // On récupère et met à jour l'état avec la création
        })
        .catch((error) => {
          console.log(error); // Gestion des erreurs
        })
        .finally(() => {
          setLoading(false); // Arrêter le chargement
        });
    }
  }, [id]); // Exécution chaque fois que l'ID change

  if (loading) {
    return (
      <LoadingComponent message="Chargement du détail des créations, veuillez patienter..." />
    );
  }

  if (!creation) {
    return <NotFound />; // Si aucune création n'a été trouvée
  }

  return (
    <div>
      <NavBar />
      <Grid2 container spacing={6}>
        <Grid xs={12} sm={6}>
          {/* Affichage de l'image de la création */}
          <img
            src={creation.pictureUrl}
            alt={creation.name}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          {/* Affichage des informations de la création */}
          <Typography variant="h3" style={{ color: "white", marginBottom: "20px" }}>
            {creation.name}
          </Typography>
          <Typography variant="h5" style={{ color: "white" }}>
            {creation.price.toFixed(2)}€
          </Typography>
        </Grid>
      </Grid2>
      <Footer />
    </div>
  );
}
