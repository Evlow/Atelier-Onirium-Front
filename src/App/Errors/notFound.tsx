import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} sx={{height: 400}}>
            <Typography gutterBottom variant='h3'>Oups - nous n'avons pas pu trouver ce que vous cherchez.</Typography>
            <Divider />
            <Button fullWidth component={Link} to='/accueil'>Retour à la page d'accueil</Button>
        </Container>
    )
}