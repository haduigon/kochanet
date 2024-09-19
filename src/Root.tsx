import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import ProtectedRoute from './routes/ProtectedRoute';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />} >
        <Route index element={<LoginPage/>}/>
        <Route path='/posts' element={
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>         
        } />
      </Route>
    </Routes>
  </HashRouter>
)