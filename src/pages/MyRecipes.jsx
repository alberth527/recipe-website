import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Container, TextField } from '@mui/material';

// 假定的食譜數據
const recipesData =  [
    { title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
    { title: 'Margherita Pizza', description: 'Simple yet delicious.' },
    { title: 'Vegetable Stir Fry', description: 'A quick and healthy meal.' },
];

function RecipeList() {
    return (
        <Container>
            <Grid container spacing={3}>
                {recipesData.map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
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