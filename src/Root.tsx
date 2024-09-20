import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import ProtectedRoute from './routes/ProtectedRoute';
import { AppContextProvider } from './context/AppContext';

export const Root = () => (
  <HashRouter>
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<Navigate to="/" />} />
          <Route index element={<LoginPage />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <PostsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AppContextProvider>
  </HashRouter>
);
