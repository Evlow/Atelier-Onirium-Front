import App from "../App";
import { createBrowserRouter, Navigate } from "react-router-dom";
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
import BasketPage from "../Components/Basket/BasketPage";

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
{ path:"/creations/:id", element:<CreationDetails />},
      {path : "admin", element : <Aside></Aside>},
      {path : "navBarAdmin", element : <NavBarAdmin></NavBarAdmin>},
      {path : "server-error", element : <ServerError></ServerError>},
      {path : "not-found", element : <NotFound></NotFound>},
      {path : "Basket/GetBasket", element : <BasketPage></BasketPage>},

      {path : "*", element : <Navigate replace to="not-found"/>},



    ],
  },
]);
