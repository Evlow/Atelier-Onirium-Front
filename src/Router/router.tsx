import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ExpoGallery from "../Pages/ExpoGallery/expoGallery";
import HomePage from "../Pages/HomePage/homePage";
import Contact from "../Pages/Contact/contact";
import PrivatePolicy from "../Pages/PrivacyPolicy/privatePolicy";
import CreationDetails from "../Components/Creations/CreationDetails";
import Locations from "../Pages/Locations/locations";
import Aside from "../Admin/Aside/aside";
import WorkshopCreation from "../Pages/WorkshopCreation/workshopCreation";
import NavBarAdmin from "../Admin/NavBarAdmin/NavBarAdmin";
import ServerError from "../App/Errors/serverError";
import NotFound from "../App/Errors/notFound";
import Dashboard from "../Admin/NavBarAdmin/Dashbord/Dashboard";
import Register from "../App/Features/Account/register";
import Login from "../App/Features/Account/login";
import RequireAuth from "./RequiredAuth";

// Configuration du routeur
export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Routes publiques
      { path: "/", element: <HomePage /> },
      { path: "accueil", element: <HomePage /> },
      { path: "creations-atelier", element: <WorkshopCreation /> },
      { path: "galerie-exposition", element: <ExpoGallery /> },
      { path: "locations", element: <Locations /> },
      { path: "me-contacter", element: <Contact /> },
      { path: "politique-de-confidentialite", element: <PrivatePolicy /> },
      { path: "creations/:id", element: <CreationDetails /> },
      { path: "connexion", element: <Login /> },
      { path: "inscription", element: <Register /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },

      // Routes administratives (authentifié + rôle Admin)
      {
        element: <RequireAuth roles={["Admin"]} />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "navBarAdmin", element: <NavBarAdmin /> },
          { path: "admin", element: <Aside /> },
        ],
      },

      // Route pour toutes les URL non définies
      { path: "*", element: <Navigate to="/not-found" replace /> },
    ],
  },
]);
