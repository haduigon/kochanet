import { useLocation } from 'react-router-dom';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();

  console.log(location.pathname);
  
  return (
    <div className="App">
      {location.pathname !== '/' && <Navbar />}     
      <Outlet />
    </div>
  );
}

export default App;
