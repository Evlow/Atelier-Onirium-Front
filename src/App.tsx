import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import agent from "./App/Api/agent";
import { getCookie } from "./App/Api/util";
import { fetchBasketAsync, setBasket } from "./Components/Basket/BasketSlice";
import { useAppDispatch } from "./App/Store/configureStore";
import { CssBaseline } from "@mui/material";
import { fetchCurrentUser } from "./App/Features/Account/accountSlice";

// Création du thème personnalisé avec un fond noir
const theme = createTheme({
  palette: {
    background: {
      default: "black",
    },
  },
  typography: {
    h1: {
      fontFamily: "Love",
      fontWeight: "lighter",
    },
    h2: {
      fontFamily: "Lovers",
      fontWeight: "lighter",
    },
    h4: {
      fontFamily: "Gowun",
      fontWeight: "lighter",
    },
    h5: {
      fontFamily: "Gowun",
      fontWeight: "lighter",
    },
    h6: {
      fontFamily: "Gowun",
      fontWeight: "lighter",
    },
  },
});

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);
  
  useEffect(() => {
    const buyerId = getCookie("buyerId");
    dispatch(fetchCurrentUser());
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Applique le thème personnalisé */}
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />{" "}
      {/* Applique les styles de base et normalise les éléments */}
      <Outlet /> {/* Permet de rendre les routes enfants */}
    </ThemeProvider>
  );
}

export default App;
