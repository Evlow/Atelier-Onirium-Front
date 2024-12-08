import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../App/Store/configureStore";

interface Props {
  roles?: string[]; // Propriété facultative pour les rôles requis pour accéder à la route.
}

export default function RequireAuth({ roles }: Props) {
  // Utilisation du hook `useAppSelector` pour récupérer l'utilisateur connecté depuis l'état Redux
  const { user } = useAppSelector((state) => state.account);
  // Utilisation de `useLocation` pour obtenir l'URL actuelle, qui sera utilisée pour rediriger l'utilisateur après la connexion.
  const location = useLocation();

  // Vérification si l'utilisateur est connecté
  if (!user) {
    // Si l'utilisateur n'est pas connecté, afficher un message d'erreur et rediriger vers la page de connexion
    toast.error("Vous devez vous connecter");
    return <Navigate to="/connexion" state={{ from: location }} />;
  }

  // Vérification si des rôles sont définis et si l'utilisateur possède l'un de ces rôles
  if (roles && !roles?.some((r) => user.roles?.includes(r))) {
    // Si l'utilisateur ne possède pas un rôle requis, afficher un message d'erreur et le rediriger vers une autre page (par exemple, l'accueil)
    toast.error("Non autorisé");
    return <Navigate to="/accueil" />;
  }

  // Si l'utilisateur est connecté et possède un des rôles requis (ou aucun rôle n'est requis), afficher le contenu de la route protégée
  return <Outlet />;
}
