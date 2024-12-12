import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import NavBar from "../NavBar/navbar";
import Footer from "../Footer/footer";
import { creationSelectors } from "../../App/Api/agent";
import LoadingComponent from "../Laoding/laodingComponent";
import NotFound from "../../App/Errors/notFound";
import { useAppDispatch, useAppSelector } from "../../App/Store/configureStore";
import { fetchCreationAsync } from "./creationSlice";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 
  margin: 20px; 
`;

export default function CreationDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const creation = useAppSelector(state => creationSelectors.selectById(state, +id!)); 

  useEffect(() => {
    dispatch(fetchCreationAsync(+id!)); 
  }, [dispatch, id]);

  if (!creation) {
    return <NotFound />; 
  }

  return (
    <div>
      <NavBar />
      <Container>
        <img
          src={creation.pictureUrl}
          alt={creation.name}
          style={{ height: "500px", width: '500px', objectFit: "cover" }}
        />
        <div>
          <Typography variant="h3">
            {creation.name}
          </Typography>
          <Typography variant="body1">
            {creation.description}
          </Typography>
        </div>
      </Container>
      <Footer />
    </div>
  );
}