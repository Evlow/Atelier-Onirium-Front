import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Creation } from "../../Models/Creations";
import agent from "../../App/Api/agent";

const creationsAdapter = createEntityAdapter<Creation>();

export const fetchCreationsAsync = createAsyncThunk<Creation[]>(
    'creation/fetchCreationsAsync',
    async () => {
        try {
            return await agent.Creations.list();

        } catch (error) {
            console.log(error)
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
        builder.addCase(fetchCreationsAsync.rejected, (state)=>{
            state.status='idle';
        });
        
      }),
})