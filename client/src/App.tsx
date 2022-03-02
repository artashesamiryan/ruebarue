
import { FC } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import AppLayout from "./Layouts/AppLayout";
import { useAppSelector } from "./Redux/hooks";


const App: FC = () => {

  const { content } = useAppSelector(state => state.content);


  const { pathId, pathName } = useAppSelector(state => state.jsonType);
  let typeName = window.location.pathname.split("/").filter((item: any) => item);
  let typeId = window.location.pathname.split("/").filter((item: any) => item);
  return (
    <div className="App" style={{ backgroundColor: content?.account?.preferences?.color_4 }}>
      <BrowserRouter
        basename={pathName && pathId ? `${typeName[0]}/${typeId[1]}` : "/rental/5188536216846336"}
      >
        <AppLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
