/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import AppLayout from "./Layouts/AppLayout";
import { useAppSelector } from "./Redux/hooks";


const App: FC = () => {

  const { pathType } = useAppSelector(state => state.jsonType);




  return (
    <div className="App">
      <BrowserRouter
        // basename={pathType}
        basename="/rental/5188536216846336"
      >
        <AppLayout />
      </BrowserRouter>
    </div>
  );
}

export default App;
