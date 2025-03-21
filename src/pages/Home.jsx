import React, { useState, useEffect } from 'react';
import { Container, Typography, Box,Card,CardMedia ,Grid,CardContent} from '@mui/material';
import { fetchRecipes } from '../api';
import { Link ,useNavigate} from 'react-router-dom';



function Home() {
    const [recipesData, setRecipes] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // 從 API 取得菜譜資料
    console.log('Home component 載入！');  // 🧪 有印嗎？
  useEffect(() => {
      console.log('✅ Home useEffect 執行！');
    fetchRecipes()
      .then(data => {
        console.log('獲取菜譜資料All:', data);
        setRecipes(data.data);
      })
      .catch(err => {
        console.error('API 請求錯誤:', err);
      });
  }, []);

    const navigate = useNavigate();
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
            {localStorage.getItem('userId') ? (
        <h6>歡迎光臨 魔法食譜 {localStorage.getItem('userId')}!</h6>
      ) : (
        <h6>歡迎光臨 魔法食譜！請<Link to="/login">登入</Link></h6>
      )}
        </Typography>
        <Typography variant="body1">
            這是一個為您提供食譜的平台。您可以在這裡找到各種美味的食譜，並且可以分享您自己的食譜。
        </Typography>
      </Box>
         <Grid container spacing={4}>
  {recipesData.map((recipe, index) => (
    <Grid item xs={12} sm={6} md={4} key={index}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={`${recipe.image_url}`}
          
          alt={recipe.title}
                          onClick={() => navigate(`/recipe/${recipe.id}`)} // 添加点击事件处理函数
                style={{ cursor: 'pointer' }} // 使鼠标悬停时显示为指针
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

export default Home;
