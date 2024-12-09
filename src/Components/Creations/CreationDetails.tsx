import { useParams } from "react-router-dom";
import { Grid, Grid2, Typography } from "@mui/material";
import { useEffect } from "react";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/footer";
import  { creationSelectors } from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import NotFound from "../../App/Errors/notFound";
import { useAppDispatch, useAppSelector } from "../../App/Store/configureStore";
import { fetchCreationAsync } from "./creationSlice";

export default function CreationDetails() {
  // const {basket, status} = useAppSelector(state =>state.basket);
  const dispatch = useAppDispatch();
  // const [creation, setCreation] = useState<Creation | null>(null);
  const {status : creationStatus} = useAppSelector (state=>state.creation);
  const { id } = useParams<{ id: string }>();
const creation = useAppSelector(state => creationSelectors.selectById(state, +id!));  // const [loading, setLoading] = useState(true);
  
  // const item = basket?.items.find(i=>i.creationId === creation?.id);

  useEffect(() => {
    if (!creation && id) dispatch(fetchCreationAsync(parseInt(id)));
  }, [id, dispatch, creation ]);

  if (creationStatus.includes('pending')){
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
            style={{height: "auto", objectFit: "cover" }}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          {/* Affichage des informations de la création */}
          <Typography variant="h3" style={{ color: "white", marginBottom: "20px" }}>
            {creation.name}
          </Typography>
          {/* <Typography variant="h5" style={{ color: "white" }}>
            {creation.price.toFixed(2)}€
          </Typography> */}
        </Grid>
      </Grid2>
      <Footer />
    </div>
  );
}
