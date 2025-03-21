import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  // 處理點擊食譜卡片的事件
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={
            recipe.image_url ||
            "https://via.placeholder.com/300x180?text=食譜圖片"
          }
          alt={recipe.title}
        />
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {recipe.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, flexGrow: 1 }}
          >
            {recipe.description && recipe.description.length > 100
              ? `${recipe.description.substring(0, 100)}...`
              : recipe.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "auto",
            }}
          >
            {recipe.cookTime && (
              <Chip
                icon={<AccessTimeIcon fontSize="small" />}
                label={`${recipe.cookTime}分鐘`}
                size="small"
                variant="outlined"
              />
            )}
            {recipe.difficulty && (
              <Chip
                icon={<RestaurantIcon fontSize="small" />}
                label={recipe.difficulty}
                size="small"
                variant="outlined"
              />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image_url: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    cookTime: PropTypes.number,
    difficulty: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
