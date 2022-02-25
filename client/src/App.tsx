/* eslint-disable dot-location */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import AppLayout from "./Layouts/AppLayout";
import { useAppDispatch, useAppSelector } from "./Redux/hooks";
import axios from "axios";
import { contentSlice } from "./Redux/features/Content/contentSlice";


const App: FC = () => {

  const { pathId, pathName } = useAppSelector(state => state.jsonType);
  const { content } = useAppSelector(state => state.content);
  const { getContent } = contentSlice.actions
  const dispatch = useAppDispatch();
  const [data, setData] = useState({});
  let typeName = window.location.pathname.split("/").filter((item: any) => item);
  let typeId = window.location.pathname.split("/").filter((item: any) => item);



  console.log(content, "APP");



  return (
    <div className="App">
      <BrowserRouter
        basename={pathName && pathId ? `${typeName[0]}/${typeId[1]}` : "/rental/5188536216846336"}
      >
        <AppLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
