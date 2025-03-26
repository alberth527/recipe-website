import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, CardMedia, Grid, CardContent, CircularProgress, Alert } from '@mui/material';
import { fetchUserFavorites } from '../api';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 確認使用者是否已登入
    const memberId = localStorage.getItem('member_id');
    if (!memberId) {
      setError('請先登入以查看您的收藏');
      setLoading(false);
      return;
    }

    // 載入使用者的收藏
    fetchUserFavorites()
      .then(data => {
        console.log('獲取收藏食譜:', data);
        if (data && data.data) {
          setFavorites(data.data);
        } else {
          setFavorites([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('獲取收藏失敗:', err);
        setError('無法載入您的收藏，請稍後再試');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          我的收藏
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {!error && favorites.length === 0 && (
          <Alert severity="info">您目前沒有任何收藏的食譜</Alert>
        )}
      </Box>

      <Grid container spacing={4}>
        {favorites.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={recipe.image_url}
                alt={recipe.title}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                style={{ cursor: "pointer" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Favorites;