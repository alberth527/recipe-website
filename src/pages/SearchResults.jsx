import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
import RecipeCard from '../Components/RecipeCard';

function SearchResults() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    
    if (query) {
      fetchSearchResults(query);
    }
  }, [location.search]);
  
  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      // 這裡應該替換為您實際的 API 請求
      const response = await fetch(
        `http://localhost:5066/api/Recipe/search?q=${query}`
      );
      const data = await response.json();
      setResults(data.data);
    } catch (error) {
      console.error('搜尋出錯:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  const searchQuery = new URLSearchParams(location.search).get('q');
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        &quot;{searchQuery}&quot; 的搜尋結果
      </Typography>
      
      {loading ? (
        <Grid container justifyContent="center" sx={{ mt: 8 }}>
          <CircularProgress />
        </Grid>
      ) : results.length > 0 ? (
        <Grid container spacing={3}>
          {results.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          找不到符合 &quot;{searchQuery}&quot; 的食譜
        </Typography>
      )}
    </Container>
  );
}

export default SearchResults;