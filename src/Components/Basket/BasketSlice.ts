import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../Models/Basket";
import agent from "../../App/Api/agent";
import { getCookie } from "../../App/Api/util";

interface BasketState {
    basket: Basket | null;  // Le panier peut être null ou un objet Basket
    status: string;
}

const initialState: BasketState = {
    basket: null,  // Le panier est initialisé à null
    status: 'idle'
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const addBasketItemAsync = createAsyncThunk<Basket, { creationId: number, quantity?: number }>(
    'basket/addBasketItemAsync',
    async ({ creationId, quantity = 1 }, thunkAPI) => {
        try {
            return await agent.Basket.addItem(creationId, quantity)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if (!getCookie('buyerId')) return false;
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, { creationId: number, quantity?: number, name?: string }>(
    'basket/removeBasketItemAsync',
    async ({ creationId, quantity }, thunkAPI) => {
        try {
            return await agent.Basket.removeItem(creationId, quantity)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)
export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;  // Met à jour l'état du panier avec la nouvelle valeur
        }
    },
    extraReducers: builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.creationId;
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.creationId + action.meta.arg.name;
        })
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const { creationId, quantity } = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.creationId === creationId);
            if (itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity!;
            if (state.basket?.items[itemIndex].quantity === 0)
                state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    }
});

// Export des actions générées par createSlice
export const { setBasket } = basketSlice.actions;

