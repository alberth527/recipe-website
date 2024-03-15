import { useState ,useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import Login from './/pages/Login';


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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          魔法食譜
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/recipes">Recipes</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/login" element={<Login />} />
  
      </Routes>
    </Router>
  );
  
}

export default App