import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
  } from "@mui/material";
  import { Creation } from "../../Models/Creations";
  
  interface Props {
    creation: Creation;
  }
  
  export default function CreationAdminCard({ creation }: Props) {
    return (
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
            variant="outlined"
            sx={{
              width: "45%",
              backgroundColor: "transparent", // Fond transparent
              border: "1px solid #640a02", // Bordure rouge
              color: "black", // Texte rouge
              margin: "5px",
              fontFamily:"Alice",
              textTransform: "none", // Désactiver la transformation de texte en majuscules


            }}
          >
            Modifier
          </Button>
  
          <Button
            variant="outlined"
            sx={{
              width: "45%",
              backgroundColor: "transparent", // Fond transparent
              border: "1px solid #640a02", // Bordure rouge
              color: "black", // Texte rouge
              margin: "5px",
              fontFamily:"Alice",
              textTransform: "none", // Désactiver la transformation de texte en majuscules

            }}
          >
            Supprimer
          </Button>
        </Box>
      </Card>
    );
  }
  