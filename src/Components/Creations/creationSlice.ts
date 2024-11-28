import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Creation } from "../../Models/Creations";
import agent from "../../App/Api/agent";

const creationsAdapter = createEntityAdapter<Creation>();

export const fetchCreationsAsync = createAsyncThunk<Creation[]>(
    'creation/fetchCreationsAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Creations.list();

        } catch (error : any) {
            return thunkAPI.rejectWithValue({error :error.data})
        }
    }
)
export const fetchCreationAsync = createAsyncThunk<Creation, number>(
    'creation/fetchCreationAsync',
    async (creationId, thunkAPI) => {
        try {
            return await agent.Creations.details(creationId);

        } catch (error : any) {
          return thunkAPI.rejectWithValue({error :error.data})
        }
    }
)

export const creationSlice = createSlice ({
    name: 'creation',
    initialState: creationsAdapter.getInitialState({
        creationsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchCreationsAsync.pending, (state) => {
            state.status='pendingFetchCreations';
        });
        builder.addCase(fetchCreationsAsync.fulfilled,(state, action) =>{
            creationsAdapter.setAll(state, action.payload);
            state.status='idle';
            state.creationsLoaded=true;
        });
        builder.addCase(fetchCreationsAsync.rejected, (state, action)=>{
            console.log(action.payload);

            state.status='idle';
        });
        builder.addCase(fetchCreationAsync.pending, (state)=>{
            state.status='pendingFetchCreation';
        });
        builder.addCase(fetchCreationAsync.fulfilled,(state, action) =>{
            creationsAdapter.upsertOne(state, action.payload);
            state.status='idle';
        });
        builder.addCase(fetchCreationAsync.rejected, (state,action)=>{
            console.log(action);
            state.status='idle';
        });
      }),
})