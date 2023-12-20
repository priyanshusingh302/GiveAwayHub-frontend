import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Home from './pages/Home';
import Login from './pages/LoginPage';
import Layout from './pages/LayoutPage';
import Signup from './pages/SignupPage';
import AuthState from './helpers/AuthState';
import NavBar from './components/NavBar';
import AuthNavBar from './components/AuthNavBar';
import { useContext } from 'react';
import AuthContext from './helpers/AuthContext';
import ItemsPage from './pages/ItemsPage';

function App() {

  const authState = useContext(AuthContext).state;
  return (
    <BrowserRouter>
      {!authState.isLoggedIn ? <NavBar /> : <AuthNavBar />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="items" element={<ItemsPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
