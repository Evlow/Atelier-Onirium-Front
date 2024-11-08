import { useParams } from "react-router-dom";
import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Creation } from "../../Models/Creations";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/footer";
import agent from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import NotFound from "../../App/Errors/notFound";
import { useAppDispatch, useAppSelector } from "../../App/Store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../Basket/BasketSlice";
import { LoadingButton } from "@mui/lab";

export default function CreationDetails() {
  const {basket, status} = useAppSelector(state =>state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [creation, setCreation] = useState<Creation | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const item = basket?.items.find(i=>i.creationId === creation?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id &&
agent.Creations.details(parseInt(id))
      .then((response) => {
        setCreation(response)      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, item]);

  function handleInputChange(event: any) {
    if (event.target.value > 0) {
        setQuantity(parseInt(event.target.value));
    }
}

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({creationId: creation?.id!, quantity: updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({creationId: creation?.id!, quantity: updatedQuantity}))
        }
    }
  if (loading) {
    if (loading) return <LoadingComponent message= "Chargement du détails des créations, veuillez patienter..."></LoadingComponent>
  }

  if (!creation) {
    return <NotFound></NotFound>
  }
  return (
    <div>
<NavBar/>
    <Grid2 container spacing={6}>
      <Grid2 size={{ xs: 6 }}>
        <img src={creation.pictureUrl} alt={creation.name} style={{width:'70%'}} />
      </Grid2>
      <Grid2 size={{ xs: 6 }}>
        <Typography variant="h3" style={{color: 'white'}}> {creation.name}</Typography>
        <Typography variant="h3" style={{color: 'white'}}> {(creation.price).toFixed(2)}€</Typography>
        <LoadingButton
                            disabled={item?.quantity === quantity}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Ajouter au panier'}
                        </LoadingButton>
{/* <TableContainer>
<Table>

    <TableBody>
        <TableRow>
            <TableCell>
                Name
            </TableCell>
        </TableRow>
    </TableBody>
</Table>

</TableContainer> */}
      </Grid2> 
    </Grid2>
    <Footer/>
    </div>
  );
}


