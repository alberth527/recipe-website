import React from 'react';
import { Container, Typography, Box,Card,CardMedia ,Grid,CardContent} from '@mui/material';

import { Link ,useNavigate} from 'react-router-dom';
// 先用假定的食譜數據未來會改為人氣top5
const recipesData = [
  { id: 1, title: '義大利卡邦尼意粉', description: '經典的義式醬汁意粉，濃郁的奶油和培根風味。' },
  { id: 2, title: '瑪格麗特披薩', description: '簡單卻美味的披薩，番茄、羅勒和莫札瑞拉乳酪的完美組合。' },
  { id: 3, title: '蔬菜炒飯', description: '快速健康的一餐，豐富的蔬菜搭配香噴噴的米飯。' },
  { id: 4, title: '印度咖哩雞', description: '濃郁香辣的印度風味咖哩，配以雞肉和香料長時間燉煮。' },
  { id: 5, title: '墨西哥牛肉捲餅', description: '道地的墨西哥街頭小吃，香辣牛肉搭配新鮮蔬菜和酸奶油。' },
];




function Home() {
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
          image={`https://source.unsplash.com/960x640/?${recipe.title}`}
          
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
