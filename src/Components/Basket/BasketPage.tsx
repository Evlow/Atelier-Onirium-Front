import { useEffect, useState } from "react";
import { Basket } from "../../Models/Basket";
import agent from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import { IconButton } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
export default function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <LoadingComponent message="Votre panier est en cours de chargement, veuillez patienter"></LoadingComponent>
    );
  if (!basket)
    return (
      <Typography variant="h3" color="white" fontFamily={"alice"}>
        Votre panier est vide
      </Typography>
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right"> Créations</TableCell>
              <TableCell align="right"> Prix</TableCell>
              <TableCell align="right"> Quantité</TableCell>
              <TableCell align="right"> Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.creationId}
                sx={{ "&:last-child td, &:last-child th": { borde: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  {item.price}€
                </TableCell>
                <TableCell align="right"> {item.quantity}</TableCell>
                <TableCell align="right">
                  {((item.price) * item.quantity)}€
                </TableCell>
                <TableCell align="right">
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
