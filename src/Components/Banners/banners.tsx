import { Box, Typography } from "@mui/material";

interface Props {
  imgBanner: string;
  textBanner?: string | null;
  positionText?: "center" | "left" | "right";
}

export default function Banners({ imgBanner, textBanner, positionText = "center" }: Props) {
  return (
    <Box
      sx={{
        position: "relative", // Permet de positionner le texte par-dessus l'image
        width: "100%",
        height: "500px", // Augmenté pour rendre la bannière plus grande
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={imgBanner}
        alt="image bannière"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover", // L'image couvre toute la bannière
        }}
      />
      {textBanner && (
        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            top: "50%",
            left: positionText === "center" ? "50%" : positionText === "left" ? "10%" : "90%",
            transform: positionText === "center" ? "translate(-50%, -50%)" : "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent pour le texte
            padding: "10px 20px",
            borderRadius: "8px", // Ajoute des coins arrondis
            textAlign: positionText,
          }}
        >
          {textBanner}
        </Typography>
      )}
    </Box>
  );
}
