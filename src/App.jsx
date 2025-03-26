import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import Login from "./pages/Login";
import RecipeDetail from "./pages/RecipeDetail";
import MyRecipes from "./pages/MyRecipes";
import AppDrawer from "./Components/AppDrawer";
import SearchResults from "./pages/SearchResults";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import "./App.css";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("App component 載入！"); // 🧪 有無？
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
  }, []);

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 0 }}>
        <Grid item xs={12} sm={6} md={24}>
          <Router basename="/recipe">
            <AppDrawer sx={{ mt: 0 }} />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
