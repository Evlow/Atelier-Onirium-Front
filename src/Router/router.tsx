import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import ExpoGallery from "../Pages/ExpoGallery/expoGallery";
import HomePage from "../Pages/HomePage/homePage";
import WorkshopCreation from "../Pages/WorkshopCreation/workshopCreation";
import Contact from "../Pages/Contact/contact";
import PrivatePolicy from "../Pages/PrivacyPolicy/privatePolicy";
import CreationDetails from "../Components/Creations/CreationDetails";
import Locations from "../Pages/Locations/locations";
import Aside from "../Admin/Aside/aside";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "accueil", element: <HomePage /> },
      { path: "creations-atelier", element: <WorkshopCreation /> },
      { path: "galerie-exposition", element: <ExpoGallery /> },
      { path: "locations", element: <Locations /> },
      { path: "me-contacter", element: <Contact /> },
      { path: "politique-de-confidentialite", element: <PrivatePolicy /> },
      { path: ":id", element: <CreationDetails /> },
      {path : "admin", element : <Aside></Aside>}
    ],
  },
]);
