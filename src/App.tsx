import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./App/Store/configureStore";
import { CssBaseline } from "@mui/material";
import { fetchCurrentUser } from "./App/Features/Account/accountSlice";

// Création du thème personnalisé avec un fond noir
const theme = createTheme({
  components: {
    // Personnalisation du TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "#640a02", // Couleur du label par défaut
            "&.Mui-focused": {
              color: "#c26a3c", // Couleur du label lorsqu'il est en focus
            },
            "&.MuiInputLabel-shrink": {
              color: "#640a02", // Couleur du label lorsqu'il est rempli (shrink)
            },
          },
        },
      },
    },
    // Personnalisation du champ InputBase pour appliquer la couleur à la bordure sous le champ
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-focused::after": {
            borderBottom: "2px solid #640a02", // Couleur de la bordure sous le champ en focus
          },
        },
      },
    },

  },
  // Palette de couleurs
  palette: {
    background: {
      default: "black", 
    },
  },
  // Typographie
  typography: {
    h1: {
      fontFamily: "Love",
      fontWeight: "lighter",
    },
    h2: {
      fontFamily: "Lovers",
      fontWeight: "lighter",
      color: "#CFC5C3", // Couleur du texte du corps
    },
    h3: {
      fontFamily: "Lovers",
      fontWeight: "lighter",
      color: "#CFC5C3", 
    },
    body1: {
      fontSize:"1.2rem",
      fontFamily: "Alice",
      color: "#CFC5C3", // Couleur du texte du corps
fontWeight:"lighter"
    },
  },
});

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline /> {/* Applique les styles de base et normalise les éléments */}
      <Outlet /> {/* Permet de rendre les routes enfants */}
    </ThemeProvider>
  );
}

export default App;
