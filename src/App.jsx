import { useState ,useEffect } from 'react'
import { Grid } from '@mui/material';

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
  <>
      <Grid container spacing={3}sx={{ mt: 0 }}>
      <Grid item xs={12} sm={6} md={24} >
        <Router>
      <AppDrawer  sx={{mt:0}}/> 

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
      </Grid>
     
    </Grid>
   
  </>

  );
  
}

export default App