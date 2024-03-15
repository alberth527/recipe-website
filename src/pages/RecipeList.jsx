import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container, TextField } from '@mui/material';

// 假定的食譜數據
const recipesData =  [
  { title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
  { title: 'Margherita Pizza', description: 'Simple yet delicious.' },
  { title: 'Vegetable Stir Fry', description: 'A quick and healthy meal.' },
  { title: 'Chicken Curry', description: 'Rich and flavorful Indian dish.' },
  { title: 'Beef Tacos', description: 'A Mexican street food staple.' },
  { title: 'Salmon with Asparagus', description: 'Light and nutritious.' },
  // 根據需要添加更多食譜...
];

function RecipeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setRecipes] = useState(recipesData);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredRecipes = recipesData.filter(recipe =>
      recipe.title.toLowerCase().includes(value.toLowerCase())
    );
    setRecipes(filteredRecipes);
  };

  return (
    <Container sx={{ my: 4 }}>
      <TextField
        fullWidth
        label="搜尋食譜..."
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        margin="normal"
      />
   <Grid container spacing={4}>
  {filteredRecipes.map((recipe, index) => (
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
