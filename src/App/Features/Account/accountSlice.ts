import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { User } from "../../../Models/User";
import agent from "../../Api/agent";
// import { setBasket } from "../../../Components/Basket/BasketSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
};

export const signInUser = createAsyncThunk<User,FieldValues >(
    'account/signInUser',
    async ({ data, navigate }, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const { ...user } = userDto;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/'); 
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<User, void>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDTO = await agent.Account.currentUser();
            const { ...user } = userDTO;
            // const { basket, ...user } = userDTO;
            // if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setUser: (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = { ...action.payload, roles: typeof roles === 'string' ? [roles] : roles };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expirée - Veuillez vous reconnecter');
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            const claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            const roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            state.user = { ...action.payload, roles: typeof roles === 'string' ? [roles] : roles };
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            throw action.payload;
        });
    }
});

export const { signOut, setUser } = accountSlice.actions;
