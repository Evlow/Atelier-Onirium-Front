import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// Importation des slices de Redux pour gérer différents morceaux d'état
// import { basketSlice } from "../../Components/Basket/BasketSlice";
import { counterSlice } from "../../Components/Counter/CounterSlice";
import { creationSlice } from "../../Components/Creations/creationSlice";
import { accountSlice } from "../Features/Account/accountSlice";

// Configuration du store Redux avec les reducers des slices
export const store = configureStore({
    reducer: {
            counter: counterSlice.reducer, // Reducer pour gérer l'état du compteur
            // basket: basketSlice.reducer, // Reducer pour gérer l'état du panier (non utilisé ici)
            creation : creationSlice.reducer, // Reducer pour gérer l'état des créations
            account: accountSlice.reducer, // Reducer pour gérer l'état de l'utilisateur (compte)
        }
    });

// Définition de types pour l'état global et le dispatch
export type RootState = ReturnType<typeof store.getState>; // Type de l'état global basé sur le store
export type AppDispatch = typeof store.dispatch; // Type de la fonction dispatch basée sur le store

// Hook personnalisé pour utiliser dispatch dans les composants fonctionnels avec un type fort
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook personnalisé pour sélectionner des valeurs depuis l'état global avec un type fort
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
