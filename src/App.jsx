import { useState ,useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import Login from './pages/Login';
import AppDrawer from './Components/AppDrawer';


import './App.css'

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  return (
      <Router>
          <AppDrawer /> 

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/login" element={<Login />} />
  
      </Routes>
    </Router>
  );
  
}

export default App