import { useEffect, useState } from "react";
import { Basket } from "../../Models/Basket";
import agent from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import { Typography } from "@mui/material";
export default function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if(loading) return <LoadingComponent message ="Votre panier est en cours de chargement, veuillez patienter"></LoadingComponent>
  if(!basket) return <Typography variant="h3" color="white" fontFamily={"alice"} >Votre panier est vide</Typography>
  
  return (
    <>
    <Typography variant="h3" color="white" fontFamily={"alice"} >Buyer Id = {}</Typography>

    </>
  )
}
