import React from 'react';
import { Container, Typography, Box,Card,CardMedia ,Grid,CardContent} from '@mui/material';
import { Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// 先用假定的食譜數據未來會改為人氣top5
const recipesData =  [
  { title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
  { title: 'Margherita Pizza', description: 'Simple yet delicious.' },
  { title: 'Vegetable Stir Fry', description: 'A quick and healthy meal.' },
  { title: 'Chicken Curry', description: 'Rich and flavorful Indian dish.' },
  { title: 'Beef Tacos', description: 'A Mexican street food staple.' },
  { title: 'Salmon with Asparagus', description: 'Light and nutritious.' },
  // 根據需要添加更多食譜...
];
 const userId = localStorage.getItem('userId');


function Home() {
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
