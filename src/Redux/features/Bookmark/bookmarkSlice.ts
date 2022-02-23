import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBookmarksId } from "./model";


const initialState: IBookmarksId = {
    bookmarksId: []
}


export const bookmarksSlice = createSlice({
    name: 'BOOKMARKS',
    initialState,
    reducers: {
        setBookmarksId: (state, { payload }: PayloadAction<number[]>) => {
            state.bookmarksId = payload;
            console.log(state.bookmarksId, "payload");

        },
    }
});


export default bookmarksSlice.reducer;