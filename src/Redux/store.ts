import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import pathTypeReducer from './features/PathType/pathTypeSlice'


export const store = configureStore({
    reducer: {
        jsonType: pathTypeReducer
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
