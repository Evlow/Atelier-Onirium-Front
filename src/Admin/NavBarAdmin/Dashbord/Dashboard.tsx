import React, { useState, useEffect } from "react";
import NavBarAdmin from "../NavBarAdmin";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { User } from "../../../Models/User";
import agent from "../../../App/Api/agent";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import {
  Container,
  Grid,
  Card,
  Button,
  CardActionArea,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
} from "@mui/material";
import { Creation } from "../../../Models/Creations";
import useCreations from "../../../App/Hook/useCreation";
import { useAppDispatch } from "../../../App/Store/configureStore";
import CreationForm from "../../../App/Form/CreationForm";
import { removeCreation } from "../../../Components/Creations/creationSlice";
import { Link as RouterLink } from "react-router-dom";

export default function Dashboard() {
  const [user, setCurrentUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const { creations } = useCreations();
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedCreation, setSelectedCreation] = useState<Creation | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);

  // State pour le dialogue de confirmation
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creationToDelete, setCreationToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await agent.Account.currentUser();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        setError("Impossible de charger votre profil. Veuillez réessayer plus tard.");
      }
    };

    fetchUserData();
  }, []);

  function handleSelectCreation(creation: Creation) {
    setSelectedCreation(creation);
    setEditMode(true);
  }

  function openDeleteDialog(id: number) {
    setDialogOpen(true);
    setCreationToDelete(id);
  }

  function confirmDeleteCreation() {
    if (creationToDelete !== null) {
      setLoading(true);
      setTarget(creationToDelete);
      agent.Admin.deleteCreation(creationToDelete)
        .then(() => dispatch(removeCreation(creationToDelete)))
        .catch((error) => console.log(error))
        .finally(() => {
          setLoading(false);
          setDialogOpen(false); 
          setCreationToDelete(null);
        });
    }
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
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress color="inherit" />
            </Box>
          )}
        </Typography>
      </Box>
      <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Grid container spacing={3}>
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
                height: "250px",
                alignContent: "center",
              }}
            >
              <Button
                onClick={() => setEditMode(true)}
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "none",
                  flexDirection: "column",
                }}
              >
                <Typography color="black" marginBottom="8px" fontSize="1.2rem">
                  Ajouter une création
                </Typography>
                <AddIcon sx={{ fontSize: "3rem", color: "#640a02" }} />
              </Button>
            </Card>
          </Grid>
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
                <RouterLink to={`/creations/${creation.id}`} style={{ textDecoration: "none" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={creation.pictureUrl}
                      alt={creation.name}
                      sx={{ objectFit: "cover" }}
                    />
                  </CardActionArea>
                </RouterLink>
                <Box sx={{ padding: "10px", display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => handleSelectCreation(creation)}
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
                    Modifier
                  </Button>
                  <Button
                    onClick={() => openDeleteDialog(creation.id)}
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

      {/* Boîte de dialogue de confirmation */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmation de suppression</DialogTitle>
        <DialogContent>
          <Typography color="black">/!\ Es-tu certaine de vouloir supprimer cette création ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color='error'>
            Annuler
          </Button>
          <Button onClick={confirmDeleteCreation} >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
