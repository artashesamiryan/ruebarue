import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPathType } from "./model";



const initialState: IPathType = {
    // pathType: 'rental/5188536216846336'
    pathType: window.location.pathname
};


export const pathSlice = createSlice({
    name: 'PATH_TYPE',
    initialState,
    reducers: {
        setPathtype: (state, { payload }: PayloadAction<string>) => {
            state.pathType = payload;
        },
    }
});

export default pathSlice.reducer;