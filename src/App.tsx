import { FC } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import AppLayout from "./Layouts/AppLayout";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";

const App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppLayout>
          <Header />
          <AppRouter />
        </AppLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
