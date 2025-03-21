
// RecipeDetail組件
import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, List, ListItem } from '@mui/material';
import { fetchRecipeDetails } from '../api';

function RecipeDetail() {
  
  const { id } = useParams(); // 獲取路由參數中的食譜ID
const [recipe, setRecipe] = useState(null); // 使用 useState 來管理菜譜資料
 const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  // 從 API 取得菜譜資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipeDetails(id);
        console.log('獲取到的菜譜資料Detail:', data);
        setRecipe(data);
      } catch (err) {
        console.error('獲取菜譜資料時發生錯誤:', err);
        setError('無法載入菜譜詳情，請稍後再試。');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        {recipe.title}
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
