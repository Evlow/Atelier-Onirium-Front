import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAppSelector } from "../App/Store/configureStore";

interface Props {
    roles?: string[];
}

export default function RequireAuth({roles}: Props) {
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();

    if (!user) {
        toast.error('Vous devez vous connecter');
        return <Navigate to='/connexion' state={{from: location}} />
    }

    if (roles && !roles?.some(r => user.roles?.includes(r))) {
        toast.error("Non autorisé");
        return <Navigate to='/accueil' />
    }

    return <Outlet />
}