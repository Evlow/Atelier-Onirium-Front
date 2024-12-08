import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { User } from "../../../Models/User";
import agent from "../../Api/agent";

// Définition de l'état initial de l'utilisateur
interface AccountState {
    user: User | null;
}

// Définition d'une interface pour les erreurs retournées par l'API
interface ApiError {
    message: string;
}

const initialState: AccountState = {
    user: null,
};

// Action asynchrone pour la connexion de l'utilisateur
export const signInUser = createAsyncThunk<User, any, { rejectValue: ApiError }>(
    "account/signInUser",
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const { ...user } = userDto;
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            // Si une erreur survient, nous rejetons avec un message d'erreur
            return thunkAPI.rejectWithValue({ message: error.response?.data || error.message });
        }
    }
);

// Action asynchrone pour récupérer les informations de l'utilisateur actuel
export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: ApiError }>(
    "account/fetchCurrentUser",
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
        try {
            const userDTO = await agent.Account.currentUser();
            const { ...user } = userDTO;
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ message: error.response?.data || error.message });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem("user")) return false;
        },
    }
);

// Slice Redux pour la gestion de l'état de l'utilisateur
export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        // Réinitialiser l'état de l'utilisateur et supprimer les données locales
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            toast.info("Vous avez été déconnecté.");
        },
        // Mettre à jour l'utilisateur dans l'état global
        setUser: (state, action: PayloadAction<User>) => {
            const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
            const roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            state.user = { ...action.payload, roles: typeof roles === "string" ? [roles] : roles };
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
            (state, action) => {
                const claims = JSON.parse(atob(action.payload.token.split(".")[1]));
                const roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                state.user = { ...action.payload, roles: typeof roles === "string" ? [roles] : roles };
            }
        );

        builder.addMatcher(
            isAnyOf(signInUser.rejected),
            (state, action: PayloadAction<ApiError | undefined>) => {
                // Vérifier que l'action contient un message d'erreur
                const errorMessage = action.payload?.message || "Connexion échouée.";
                toast.error(errorMessage);
            }
        );
    },
});

export const { signOut, setUser } = accountSlice.actions;

export default accountSlice.reducer;
