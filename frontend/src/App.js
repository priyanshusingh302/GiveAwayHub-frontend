import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Login from './pages/LoginPage';
import Layout from './pages/LayoutPage';
import Signup from './pages/SignupPage';
import NavBar from './components/NavBar';
import AuthNavBar from './components/AuthNavBar';
import { useContext } from 'react';
import AuthContext from './helpers/AuthContext';
import ItemsPage from './pages/ItemsPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';
import GivePage from './pages/GivePage';

function App() {

  const authState = useContext(AuthContext).state;
  return (
    <BrowserRouter>
      {!authState.isLoggedIn ? <NavBar /> : <AuthNavBar />}
      <Routes>
        <Route
          path=""
          element={<Navigate to="/items" />}
        />

        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="give" element={<GivePage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
