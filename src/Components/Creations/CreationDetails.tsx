import { useParams } from "react-router-dom";
import { Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Creation } from "../../Models/Creations";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/footer";
import agent from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import NotFound from "../../App/Errors/notFound";

export default function CreationDetails() {
  const { id } = useParams<{ id: string }>();
  const [creation, setCreation] = useState<Creation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

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
