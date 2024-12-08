// Dashboard.tsx
import Aside from "../../Aside/aside";
import NavBarAdmin from "../NavBarAdmin";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { User } from "../../../Models/User";
import { useState, useEffect } from "react";
import agent from "../../../App/Api/agent";

export default function Dashboard() {
  // Utilisation de l'état pour gérer l'utilisateur, initialisé à undefined
  const [user, setCurrentUser] = useState<User | undefined>(undefined);

  // Utilisation du useEffect pour récupérer les données de l'utilisateur dès le premier rendu du composant
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await agent.Account.currentUser(); // Assurez-vous que cette méthode renvoie bien un utilisateur
        setCurrentUser(userData);  // Assigner l'utilisateur récupéré dans l'état
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <NavBarAdmin /> {/* Barre de navigation */}
      <Box sx={{ display: 'flex', flex: 1 }}> {/* Conteneur flex pour Aside et contenu principal */}
        <Aside />
        <Box 
          sx={{
            flex: 1, // Prend tout l'espace restant
            padding: '70px', // Espace autour du contenu
            overflowY: 'auto', // Assure que le contenu peut défiler si nécessaire
            paddingLeft:"200px"
            
          }}
        >
          {/* Box pour styliser la zone de texte */}
          <Typography component="h2" color="white" variant="h4">
            {user ? (
              `Bienvenue ${user.userName}, sur ton espace !`
            ) : (
              <div>Chargement de votre profil...</div>
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
