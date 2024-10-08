import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom"; 

export default function ServerError() {
    const navigate = useNavigate(); // Hook pour naviguer entre les pages
    const { state } = useLocation();// Typage de useLocation

    return (
        <Container component={Paper} style={{ padding: '20px' }}> {/* Ajout d'un padding pour le style */}
            {state?.error ? ( // Vérification de l'objet d'erreur dans l'état
                <>
                    <Typography variant='h3' color='error' gutterBottom>
                        {state.error.title} {/* Affichage du titre de l'erreur */}
                    </Typography>
                    <Divider />
                    <Typography>{state.error.detail || 'Internal server error'}</Typography> {/* Détail de l'erreur ou message par défaut */}
                </>
            ) : (
                <Typography variant='h5' gutterBottom>Erreur de serveur</Typography> // Message par défaut en cas d'absence d'erreur
            )}
            <Button 
                variant="contained" // Style du bouton
                onClick={() => navigate('/accueil')} // Navigation vers la page d'accueil
                style={{ marginTop: '20px' }} // Ajout d'une marge en haut du bouton
            >
                Retour à la page d'accueil
            </Button>
        </Container>
    );
}
