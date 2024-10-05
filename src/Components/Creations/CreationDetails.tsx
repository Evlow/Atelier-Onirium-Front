import { useParams } from "react-router-dom";
import { Divider, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Creation } from "../../Models/Creations";
import WorkshopCreation from '../../Pages/WorkshopCreation/workshopCreation';

export default function CreationDetails() {
  const { id } = useParams<{ id: string }>();
  const [creation, setCreation] = useState<Creation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/Creation/CreationId/${id}`)
      .then((response) => {
        setCreation(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Typography>Patience, les créations arrivent...</Typography>;
  }

  if (!creation) {
    return <Typography>Désolée, aucune création n'a été trouvée...</Typography>;
  }

  return (
    <Grid2 container spacing={6}>
      {/* <Grid2>
        <img src={creation.pictureUrl} alt={creation.name} />
      </Grid2> */}
      { <Grid2>
        <Typography variant="h3" style={{color: 'white'}}> {creation.name}</Typography>
      </Grid2> }
    </Grid2>
  );
}
