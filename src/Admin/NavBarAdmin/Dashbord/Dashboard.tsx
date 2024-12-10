import Aside from "../../Aside/aside";
import NavBarAdmin from "../NavBarAdmin";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { User } from "../../../Models/User";
import { useState, useEffect } from "react";
import agent from "../../../App/Api/agent";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from '@mui/icons-material/Add'; 
import {
  Container,
  Grid,
  Card,
  Button,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Creation } from "../../../Models/Creations";
import CreationAdminCard from "../../../Components/Creations/CreationAdminCard";

export default function Dashboard() {
  const [user, setCurrentUser] = useState<User | undefined>(undefined);
  const [creations, setCreations] = useState<Creation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await agent.Account.currentUser();
        setCurrentUser(userData);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        setError(
          "Impossible de charger votre profil. Veuillez réessayer plus tard."
        );
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCreations = async () => {
      try {
        const creationsData = await agent.Creations.list();
        setCreations(creationsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des créations:", error);
      }
    };

    fetchCreations();
  }, []);

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
        <Grid container spacing={3} >
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
                alignContent:"center"
              
              }}
            >
              <Button
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
                <AddIcon sx={{ fontSize: "3rem", color: "#640a02" }} /> {/* Icône "+" */}
              </Button>
            </Card>
          </Grid>

          {/* Afficher les créations */}
          {creations.length > 0 ? (
            creations.map((creation) => (
              <Grid item xs={12} sm={6} md={3} key={creation.id}>
                <CreationAdminCard creation={creation} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="white" textAlign="center">
              Aucune création disponible pour le moment.
            </Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}
