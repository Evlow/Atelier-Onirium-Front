import NavBarAdmin from "../NavBarAdmin";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { User } from "../../../Models/User";
import { useState, useEffect } from "react";
import agent from "../../../App/Api/agent";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import { Container, Grid, Card, Button, CardActionArea, CardMedia } from "@mui/material";
import { Creation } from "../../../Models/Creations";
import useCreations from "../../../App/Hook/useCreation";
import { useAppDispatch } from "../../../App/Store/configureStore";
import CreationForm from "../../../App/Form/CreationForm";
import { removeCreation } from "../../../Components/Creations/creationSlice";

export default function Dashboard() {
  const [user, setCurrentUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const { creations } = useCreations();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedCreation, setSelectedCreation] = useState<
    Creation | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await agent.Account.currentUser();
        setCurrentUser(userData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
        setError(
          "Impossible de charger votre profil. Veuillez réessayer plus tard."
        );
      }
    };

    fetchUserData();
  }, []);

  function handleSelectCreation(creation: Creation) {
    setSelectedCreation(creation);
    setEditMode(true);
  }

  function handleDeleteCreation(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteCreation(id)
      .then(() => dispatch(removeCreation(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedCreation) setSelectedCreation(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <CreationForm creation={selectedCreation} cancelEdit={cancelEdit} />;
  return (
    <>
      <NavBarAdmin />
      {/* Box principal - contenu principal */}
      <Box>
        <Typography
          variant="h3"
          color="white"
          textAlign="center"
          fontSize="1.8rem"
          padding="30px"
          fontFamily="Alice"
        >
          {error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          ) : user ? (
            `✨Wesh ${user.userName}, maintenant c'est à toi de te débrouiller pour gérer ton site !✨`
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress color="inherit" />
            </Box>
          )}
        </Typography>
      </Box>
      <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Grid container spacing={3}>
          {/* Carte "Ajouter une création" */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                maxWidth: "250px",
                margin: "auto",
                backgroundColor: "#e7e2e1",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "250px", // Fixer une hauteur uniforme
                alignContent: "center",
              }}
            >
              <Button
                onClick={() => setEditMode(true)}
                variant="outlined"
                sx={{
                  width: "100%", // Prendre toute la largeur de la carte
                  height: "100%", // Prendre toute la hauteur de la carte
                  border: "none",
                  display: "flex",
                  justifyContent: "center", // Centrer horizontalement
                  alignItems: "center", // Centrer verticalement
                  textTransform: "none", // Désactiver la transformation de texte en majuscules
                  flexDirection: "column", // Disposer le texte et l'icône verticalement
                }}
              >
                <Typography
                  color="black"
                  marginBottom="8px" // Espacement entre le texte et l'icône
                  fontSize="1.2rem"
                >
                  Ajouter une création
                </Typography>
                <AddIcon sx={{ fontSize: "3rem", color: "#640a02" }} />{" "}
                {/* Icône "+" */}
              </Button>
            </Card>
          </Grid>

          {/* Afficher les créations */}
          {creations.map((creation) => (
            <Grid item xs={12} sm={6} md={3} key={creation.id}>
    <Card
      sx={{
        maxWidth: "250px",
        margin: "auto",
        backgroundColor: "#e7e2e1",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography
        gutterBottom
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
          padding: "10px",
        }}
      >
        {creation.name}
      </Typography>

      <CardActionArea>
        <CardMedia
          component="img"
          height="250px"
          image={creation.pictureUrl}
          alt={creation.name}
          sx={{
            objectFit: "cover",
          }}
        />
      </CardActionArea>

      <Box sx={{ padding: "10px", display: "flex", justifyContent: "center" }}>
        {/* Bouton Modifier */}
        <Button
          onClick={() => handleSelectCreation(creation)}
          variant="outlined"
          sx={{
            width: "45%",
            backgroundColor: "transparent", // Fond transparent
            border: "1px solid #640a02", // Bordure rouge
            color: "black", // Texte rouge
            margin: "5px",
            fontFamily: "Alice",
            textTransform: "none", // Désactiver la transformation de texte en majuscules
          }}
        >
          Modifier
        </Button>

        {/* Bouton Supprimer */}
        <Button
          onClick={() => handleDeleteCreation(creation.id)}
          variant="outlined"
          sx={{
            width: "45%",
            backgroundColor: "transparent",
            border: "1px solid #640a02",
            color: "black",
            margin: "5px",
            fontFamily: "Alice",
            textTransform: "none",
          }}
        >
          Supprimer
        </Button>
      </Box>
    </Card>















            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
