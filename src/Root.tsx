import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />} />
    </Routes>
  </HashRouter>
)