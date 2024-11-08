import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useAtelierContext } from "../../App/Context/context";
import { useState } from "react";
import agent from "../../App/Api/agent";
import { LoadingButton } from "@mui/lab";
import NavBar from "../NavBar/navbar";
import "./BasketPage.css";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom"; 

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useAtelierContext();
  const [loading, setLoading] = useState(false);
  const total = basket?.items.reduce(
    (sum, item) => sum + item.price * item.quantity, // Calcule le total en ajoutant le prix de chaque article multiplié par sa quantité
    0 // Valeur initiale de `sum` est 0, au cas où le panier serait vide
  );

// Fonction pour gérer l'ajout d'un article dans le panier
function handleAddItem(creationId: number) {
  setLoading(true); // Indique que le chargement est en cours
  agent.Basket.addItem(creationId) // Appelle l'API pour ajouter l'article
    .then((basket) => setBasket(basket)) // Met à jour le panier avec la réponse de l'API
    .catch((error) => console.log(error)) // Affiche une erreur dans la console en cas d'échec
    .finally(() => setLoading(false)); // Désactive l'état de chargement une fois l'opération terminée
}

// Fonction pour gérer la suppression d'un article dans le panier
function handleRemoveItem(creationId: number, quantity = 1) {
  setLoading(true); // Active l'état de chargement pour indiquer que l'opération est en cours
  agent.Basket.removeItem(creationId, quantity)   // Appelle l'API pour supprimer un article ou réduire sa quantité dans le panier
    .then(() => removeItem(creationId, quantity)) // Si la suppression est réussie, met à jour le panier localement
    .catch((error) => console.log(error)) // En cas d'échec, affiche l'erreur dans la console pour faciliter le débogage
    .finally(() => setLoading(false)); // Désactive l'état de chargement, qu'il y ait eu une erreur ou non
}


// Calcul du prix total des articles dans le panier


if ( basket?.items.length === 0) {
  return (
    <>
      <NavBar />
      <Box width="80%" margin="20px auto">
        <Typography
          fontFamily={"Gowun"}
          fontSize={"1.5rem"}
          color="white"
          padding={"20px 0 20px 0"}
        >
          Votre panier est vide...
        </Typography>
      </Box>
      <Footer />
    </>
  );
}


  return (
    <>
      <NavBar />
      <Box width="80%" margin="20px auto">
        <Typography
          fontFamily={"Gowun"}
          fontSize={"1.5rem"}
          color="white"
          padding={"20px 0 20px 0"}
        >
          Mon panier
        </Typography>
        <Grid2 container spacing={2}>
          {/* Section du panier */}
          <Grid2 size={{ xs: 12, md: 8 }}>
            <Stack component={Paper} bgcolor={"#E7E2E1"}>
              {basket?.items.map((item) => (
                <Box
                  key={item.creationId}
                  sx={{
                    margin: "10px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    borderBottom: "1px solid #640a02",
                  }}
                >
                  <Box>
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ width: 100 }}
                    />
                  </Box>
                  <Box sx={{ padding: "0 20px", flexGrow: 1 }}>
                    <Typography
                      textAlign={"center"}
                      fontWeight={"bold"}
                      fontFamily={"Gowun"}
                      fontSize={"1rem"}
                      color="black"
                      sx={{
                        WebkitLineClamp: 2,
                        wordWrap: "break-word",
                      }}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      textAlign={"center"}
                      fontFamily={"Gowun"}
                      color="black"
                    >
                      {item.price.toFixed(2)}€
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border={"1px solid  #AD8A3D"}
                    borderRadius="4px"
                    margin="0 20px"
                    sx={{ padding: "5px" }}
                  >
                    <LoadingButton
                      loading={loading}
                      onClick={() => handleRemoveItem(item.creationId)}
                      sx={{ minWidth: "30px", color: "black" }}
                    >
                      <Remove sx={{ color: "black" }} />
                    </LoadingButton>
                    <Typography
                      padding={"0 10px"}
                      fontWeight={"bold"}
                      fontFamily={"Gowun"}
                      color="black"
                    >
                      {item.quantity}
                    </Typography>
                    <LoadingButton
                      loading={loading}
                      onClick={() => handleAddItem(item.creationId)}
                      sx={{ minWidth: "10px", color: "black" }}
                    >
                      <Add sx={{ color: "black" }} />
                    </LoadingButton>
                  </Box>
                  <Typography
                    fontFamily={"Gowun"}
                    fontSize={"1rem"}
                    fontWeight={"bold"}
                    color="black"
                    padding={"5px"}
                    margin="0 20px"
                  >
                    {(item.quantity * item.price).toFixed(2)}€
                  </Typography>
                  <LoadingButton
                    loading={loading}
                    onClick={() =>
                      handleRemoveItem(item.creationId, item.quantity)
                    }
                  >
                    <Delete sx={{ color: "red" }} />
                  </LoadingButton>
                </Box>
              ))}
            </Stack>
            <Link to="/accueil" style={{ textDecoration: "none" }}>
              <Typography
                fontFamily={"Gowun"}
                fontSize={"1rem"}
                padding={"10px 0"}
                color="white"
              >
                {"<"} Continuer à parcourir le site
              </Typography>
            </Link>
          </Grid2>
          {/* Section Total */}
          <Grid2 size={{ xs: 9, md: 4 }}>
            <Stack component={Paper} bgcolor={"#E7E2E1"} padding={"10px"}>
              <Typography
                fontFamily={"Gowun"}
                fontSize={"1.2rem"}
                color="black"
                paddingBottom={"20px"}
                borderBottom={"1px solid #640a02"}
              >
                Résumé de la commande
              </Typography>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                marginTop={"10px"}
                paddingBottom={"20px"}
                borderBottom={"1px solid #640a02"}
              >
                <Typography
                  fontFamily={"Gowun"}
                  fontSize={"1.2rem"}
                  color="black"
                  fontWeight={"bold"}
                >
                  Sous-total :
                </Typography>
                <Typography
                  fontFamily={"Gowun"}
                  fontSize={"1.2rem"}
                  fontWeight={"bold"}
                  color="black"
                >
                  {total?.toFixed(2)}€
                </Typography>
              </Box>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                marginTop={"10px"}
              >
                <Typography
                  fontFamily={"Gowun"}
                  fontSize={"1.2rem"}
                  color="black"
                  fontWeight={"bold"}
                >
                  Total :
                </Typography>
                <Typography
                  fontFamily={"Gowun"}
                  fontSize={"1.2rem"}
                  fontWeight={"bold"}
                  color="black"
                >
                  {total?.toFixed(2)}€
                </Typography>
              </Box>
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
      <Footer />
    </>
  );
}
