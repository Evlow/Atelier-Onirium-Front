import { Box, Grid2, Paper, Stack, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useAtelierContext } from "../../App/Context/context";
import { useState } from "react";
import agent from "../../App/Api/agent";
import { LoadingButton } from "@mui/lab";
import NavBar from "../NavBar/navbar";
import "./BasketPage.css";
import Footer from "../Footer/footer";

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
  const total = basket.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <NavBar />

      <Box width="80%" margin="0 auto" marginTop={"20px"}>
        <Typography
          fontFamily={"Gowun"}
          fontSize={"1.5rem"}
          color="white"
          textAlign={"center"}
        >
          Récapitulatif de mon panier
        </Typography>
        <Grid2 display="flex" spacing={2}>
          {/* Section du panier */}
          <Box flex={2} marginRight={2}>
            <Stack component={Paper} bgcolor={"#E7E2E1"}>
              {basket.items.map((item) => (
                <Box
                  key={item.creationId}
                  sx={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "flex-start",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <Box>
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ width: 150 }}
                    />
                  </Box>
                  <Box sx={{ paddingLeft: "10px" }}>
                    <Typography fontFamily={"Gowun"} color="black">
                      {item.name}
                    </Typography>
                    <Typography fontFamily={"Gowun"} color="black">
                      {item.price}€
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" marginLeft="auto">
                    <LoadingButton
                      loading={loading}
                      onClick={() => handleRemoveItem(item.creationId)}
                      sx={{ minWidth: "30px", marginRight: "5px" }}
                    >
                      <Remove />
                    </LoadingButton>
                    <Typography
                      padding={"0 10px"}
                      fontFamily={"Gowun"}
                      color="black"
                    >
                      {item.quantity}
                    </Typography>
                    <LoadingButton
                      loading={loading}
                      onClick={() => handleAddItem(item.creationId)}
                      sx={{ minWidth: "20px", marginLeft: "5px" }}
                    >
                      <Add />
                    </LoadingButton>
                  </Box>
                  <Typography
                    fontFamily={"Gowun"}
                    color="black"
                    padding={"10px"}
                  >
                    {item.quantity * item.price}€
                  </Typography>
                  <LoadingButton
                    loading={loading}
                    onClick={() =>
                      handleRemoveItem(item.creationId, item.quantity)
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Section Total */}
          <Box flex={1}>
            <Stack component={Paper} bgcolor={"#E7E2E1"}>
              <Typography fontFamily={"Gowun"} fontSize={"1.5rem"} color="red">
                Total
              </Typography>
              <Typography color="red" marginTop={2} fontSize={"1.2rem"}>
                {total}€
              </Typography>
            </Stack>
          </Box>
        </Grid2>
      </Box>
      <Footer />
    </>
  );
}
