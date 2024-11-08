import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../Models/Basket";
import agent from "../../App/Api/agent";

interface BasketState {
    basket: Basket | null;  // Le panier peut être null ou un objet Basket
    status: string;
}

const initialState: BasketState = {
    basket: null,  // Le panier est initialisé à null
    status: 'idle'
};
export const addBasketItemAsync = createAsyncThunk<Basket, { creationId: number, quantity: number }>(
    'basket/addBasketItemAsync',
    async ({ creationId, quantity }) => {
        try {
            return await agent.Basket.addItem(creationId, quantity)
        } catch (error) {
            console.log(error)
        }
    }
)
export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;  // Met à jour l'état du panier avec la nouvelle valeur
        },

        removeItem: (state, action) => {
            const { creationId, quantity } = action.payload;  // Déstructuration correcte


            const itemIndex = state.basket?.items.findIndex(i => i.creationId === creationId); // Cherche l'article à supprimer

            if (itemIndex === -1) {
                state.basket!.items[itemIndex].quantity -= quantity;

                if (state.basket?.items[itemIndex].quantity === 0) {
                    state.basket.items.splice(itemIndex, 1);
                }
            }
        },
    },
    extraReducers: (builder => {
        // Lorsque l'ajout d'un article au panier commence (en attente)
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action); // Affiche les détails de l'action dans la console (utile pour le debug)
            
            // Changer le statut de l'état pour indiquer qu'une action de type "ajout au panier" est en cours
            state.status = 'pendingAddItem'; 
        });
    
        // Lorsque l'ajout d'un article au panier est terminé avec succès
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            // L'action contient la réponse de l'API, donc ici l'état du panier est mis à jour avec le contenu retourné
            state.basket = action.payload; 
    
            // Le statut est réinitialisé à 'idle' pour indiquer que l'opération est terminée
            state.status = 'idle'; 
        });
    
        // Lorsque l'ajout d'un article au panier échoue (erreur)
        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            // Réinitialisation du statut à 'idle' même en cas d'échec de l'opération
            // Cela peut être modifié pour afficher un message d'erreur si nécessaire
            state.status = 'idle'; 
        });
    })
    
});

// Export des actions générées par createSlice
export const { setBasket, removeItem } = basketSlice.actions;
