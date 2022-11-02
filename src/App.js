import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './routes';

function App() {
  return (
    <Routes>
      {routes.map(route => {
        return <Route key={Date.now()} {...route} />
      })}
    </Routes>
  );
}

export default App;
