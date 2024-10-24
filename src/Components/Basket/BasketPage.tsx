import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useAtelierContext } from "../../App/Context/context";
import { useState } from "react";
import agent from "../../App/Api/agent";
import { LoadingButton } from "@mui/lab";
import NavBar from "../NavBar/navbar";
import "./BasketPage.css";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom"; // Correct import

export default function BasketPage() {
  const { basket, setBasket } = useAtelierContext();
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function handleRemoveItem(productId: number, quantity = 1) {
    setLoading(true);
    agent.Basket.removeItem(productId, quantity)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  if (!basket) {
    return (
      <Typography variant="h3" color="white" fontFamily={"Alice"}>
        Votre panier est vide
      </Typography>
    );
  }

  // Calculer le total
  const total = basket.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
              {basket.items.map((item) => (
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
                  {total.toFixed(2)}€
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
                  {total.toFixed(2)}€
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
