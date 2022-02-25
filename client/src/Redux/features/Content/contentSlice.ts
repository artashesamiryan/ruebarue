import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContent } from "./model";


const initialState: IContent = {
    content: {}
}


export const contentSlice = createSlice({
    name: "CONTENT",
    initialState,
    reducers: {
        getContent: (state, { payload }: PayloadAction<any>) => {
            state.content = payload;
        },
    }
});

export default contentSlice.reducer;