import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Creation } from "../../Models/Creations";
import agent from "../../App/Api/agent";
import { RootState } from "../../App/Store/configureStore";

const creationsAdapter = createEntityAdapter<Creation>();

export const fetchCreationsAsync = createAsyncThunk<Creation[]>(
    'creation/fetchCreationsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Creations.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchCreationAsync = createAsyncThunk<Creation, number>(
    'creation/fetchCreationAsync',
    async (creationId, thunkAPI) => {
        try {
            return await agent.Creations.details(creationId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const creationSlice = createSlice({
    name: 'creation',
    initialState: creationsAdapter.getInitialState({
        creationsLoaded: false, // Tracks if creations are loaded
        status: 'idle', // General loading status
    }),
    reducers: {
        setCreation: (state, action) => {
            creationsAdapter.upsertOne(state, action.payload);
        },
        removeCreation: (state, action) => {
            creationsAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCreationsAsync.pending, (state) => {
            state.status = 'pendingFetchCreations';
        });
        builder.addCase(fetchCreationsAsync.fulfilled, (state, action) => {
            creationsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.creationsLoaded = true; // Indicate that creations are loaded
        });
        builder.addCase(fetchCreationsAsync.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCreationAsync.pending, (state) => {
            state.status = 'pendingFetchCreation';
        });
        builder.addCase(fetchCreationAsync.fulfilled, (state, action) => {
            creationsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCreationAsync.rejected, (state, action) => {
            console.log(action);
            state.status = 'idle';
        });
    },
});

export const creationSelectors = creationsAdapter.getSelectors((state: RootState) => state.creation);

export const { setCreation, removeCreation } = creationSlice.actions;
