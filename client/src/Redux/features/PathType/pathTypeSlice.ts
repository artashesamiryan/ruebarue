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


// export const fetchContent = (): AppThunk => {
//     return async (dispatch: any) => {
//         try {
//             const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/${typeName[0]}/${typeId[1]}`);
//             dispatch(fetchContent());
//         } catch (error: any) {
//             console.log(error);

//         }
//     };
// };

export const a = pathSlice.reducer;

export default pathSlice.reducer;