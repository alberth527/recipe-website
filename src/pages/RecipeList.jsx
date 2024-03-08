import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container } from '@mui/material';

// 假設這是從某處獲取的食譜數據
const recipes = [
  { title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
  { title: 'Margherita Pizza', description: 'Simple yet delicious.' },
  { title: 'Vegetable Stir Fry', description: 'A quick and healthy meal.' },
  { title: 'Chicken Curry', description: 'Rich and flavorful Indian dish.' },
  { title: 'Beef Tacos', description: 'A Mexican street food staple.' },
  { title: 'Salmon with Asparagus', description: 'Light and nutritious.' },]

function RecipeList() {
  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {recipes.map((recipe, index) => (
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

export default RecipeList;
