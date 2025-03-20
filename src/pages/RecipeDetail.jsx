
// RecipeDetail組件
import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, List, ListItem } from '@mui/material';
const apiUrl = import.meta.env.VITE_API_URL;

function RecipeDetail() {
  
  const { id } = useParams(); // 獲取路由參數中的食譜ID
const [recipe, setRecipe] = useState(null); // 使用 useState 來管理菜譜資料
 const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  // 從 API 取得菜譜資料
useEffect(() => {
  const fetchRecipes = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '/api';
      const apiUrl = `${baseUrl.replace(/\/$/, '')}/RecipeDetails/${id}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API 回應錯誤: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data) {
        console.log('獲取到的菜譜資料:', data);
        setRecipe(data.data);
      } else {
        console.error('API 回傳的資料結構錯誤:', data);
        setError('API 回傳資料格式錯誤');
      }
    } catch (error) {
      console.error('獲取菜譜資料時發生錯誤:', error);
      setError('無法載入菜譜詳情，請稍後再試。');
    } finally {
      setLoading(false);
    }
  };

  fetchRecipes();
}, [id]);



 const navigate = useNavigate();

  // 在資料加載時顯示 loading
  if (!recipe) {
    return <div>載入中...</div>;
  }

  const handleBack = () => {
     navigate(-1);
  };

  return (
    <Box sx={{ my: 4 }}>
       <button onClick={handleBack}>回上一頁</button>
      <Typography variant="h4" component="h1" gutterBottom>
        {recipe.recipe_id}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          height="400"
          width="400"
          image={recipe.image_url}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            食材
          </Typography>
          <List>
            {recipe.ingredients?.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            ))}
          </List>
          <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
            製作步驟
          </Typography>
          <List>
            {recipe.steps?.map((step, index) => (
              <ListItem key={index}>{` ${step}`}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RecipeDetail;
