import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { User } from "../../../Models/User"; // Modèle de l'utilisateur
import agent from "../../Api/agent"; // API pour gérer les appels réseau

// Définition de l'état initial de l'utilisateur
interface AccountState {
    user: User | null; // L'utilisateur est soit un objet User, soit null s'il n'est pas connecté
}

// Définition d'une interface pour les erreurs retournées par l'API
interface ApiError {
    message: string; // Message d'erreur retourné par l'API
}

// État initial avec l'utilisateur défini à null
const initialState: AccountState = {
    user: null,
};

// Action asynchrone pour la connexion de l'utilisateur
// La fonction crée un jeton de connexion et le stocke dans le localStorage
export const signInUser = createAsyncThunk<User, any, { rejectValue: ApiError }>(
    "account/signInUser", // Action type
    async (data, thunkAPI) => { // Prend les données envoyées (par exemple, le nom d'utilisateur et le mot de passe)
        try {
            // Appel API pour effectuer la connexion
            const userDto = await agent.Account.login(data);
            const { ...user } = userDto; // Destructuration de la réponse pour récupérer l'utilisateur
            // Stocker l'utilisateur dans le localStorage
            localStorage.setItem("user", JSON.stringify(user));
            return user; // Renvoie l'utilisateur connecté
        } catch (error: any) {
            // En cas d'erreur, nous rejetons la requête avec un message d'erreur
            return thunkAPI.rejectWithValue({ message: error.response?.data || error.message });
        }
    }
);

// Action asynchrone pour récupérer les informations de l'utilisateur actuel
// Cette action vérifie d'abord si l'utilisateur est dans le localStorage avant d'effectuer un appel API
export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: ApiError }>(
    "account/fetchCurrentUser", // Action type
    async (_, thunkAPI) => {
        // Si l'utilisateur est déjà dans le localStorage, on l'ajoute à l'état
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
        try {
            // Appel API pour récupérer les informations actuelles de l'utilisateur
            const userDTO = await agent.Account.currentUser();
            const { ...user } = userDTO; // Destructuration pour récupérer l'utilisateur
            localStorage.setItem("user", JSON.stringify(user)); // Mise à jour du localStorage
            return user; // Renvoie l'utilisateur
        } catch (error: any) {
            // En cas d'erreur, renvoyer un message d'erreur
            return thunkAPI.rejectWithValue({ message: error.response?.data || error.message });
        }
    },
    {
        // Condition pour vérifier si l'utilisateur est dans le localStorage avant d'effectuer la requête
        condition: () => {
            if (!localStorage.getItem("user")) return false; // Si aucun utilisateur n'est trouvé, on ne lance pas la requête
        },
    }
);

// Slice Redux pour gérer l'état de l'utilisateur
export const accountSlice = createSlice({
    name: "account", // Nom de la slice
    initialState, // État initial
    reducers: {
        // Réinitialise l'état de l'utilisateur et supprime les données locales
        signOut: (state) => {
            state.user = null; // L'utilisateur est déconnecté
            localStorage.removeItem("user"); // Suppression du localStorage
            toast.info("Vous avez été déconnecté."); // Message de déconnexion
        },
        // Met à jour l'utilisateur dans l'état global après un succès de connexion
        setUser: (state, action: PayloadAction<User>) => {
            // Décodage du token pour récupérer les rôles de l'utilisateur
            const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
            const roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            state.user = { ...action.payload, roles: typeof roles === "string" ? [roles] : roles }; // Mise à jour de l'utilisateur avec ses rôles
        },
    },
    extraReducers: (builder) => {
        // Matcher pour l'action de connexion réussie ou la récupération de l'utilisateur actuel
        builder.addMatcher(
            isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), // Lorsque l'une des actions asynchrones réussit
            (state, action) => {
                // Décodage du token pour récupérer les rôles
                const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
                const roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                state.user = { ...action.payload, roles: typeof roles === "string" ? [roles] : roles }; // Mise à jour de l'état avec les informations de l'utilisateur
            }
        );

        // Matcher pour l'action de connexion échouée
        builder.addMatcher(
            isAnyOf(signInUser.rejected), // Si l'action de connexion échoue
            (state, action: PayloadAction<ApiError | undefined>) => {
                // Vérifie si l'action contient un message d'erreur
                const errorMessage = action.payload?.message || "Connexion échouée.";
                toast.error(errorMessage); // Affiche un message d'erreur
            }
        );
    },
});

// Exportation des actions définies dans le slice
export const { signOut, setUser } = accountSlice.actions;

// Exportation du reducer pour l'intégration dans le store Redux
export default accountSlice.reducer;
