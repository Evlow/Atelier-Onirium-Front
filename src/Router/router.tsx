import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import ExpoGallery from "../Pages/ExpoGallery/expoGallery";
import HomePage from "../Pages/HomePage/homePage";
import Locations from "../Pages/Locations/locations";
import WorkshopCreation from "../Pages/WorkshopCreation/workshopCreation";


export const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "accueil", element: <HomePage /> },
        { path: "creations-entreprise", element: <WorkshopCreation/> },
        { path: "galerie-exposition", element: <ExpoGallery /> },
        { path: "locations", element: <Locations /> },

      ],
    },
  ]);
  