import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPathType } from "./model";


let typeName = window.location.pathname.split("/").filter((item: any) => item);
let typeId = window.location.pathname.split("/").filter((item: any) => item);



const initialState: IPathType = {
    pathName: typeName[0],
    pathId: typeId[1]
};


export const pathSlice = createSlice({
    name: 'PATH_TYPE',
    initialState,
    reducers: {
        setPathtype: (state, { payload }: PayloadAction<string>) => {
            state.pathName = payload;
            state.pathId = payload;
        },


    }
});

export const a = pathSlice.reducer;

export default pathSlice.reducer;