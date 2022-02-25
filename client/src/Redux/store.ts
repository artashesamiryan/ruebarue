import bookmarksReducer from './features/Bookmark/bookmarkSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import pathTypeReducer from './features/PathType/pathTypeSlice'
import contentSlice from "./features/Content/contentSlice";


export const store = configureStore({
    reducer: {
        jsonType: pathTypeReducer,
        bookmarksId: bookmarksReducer,
        content: contentSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
