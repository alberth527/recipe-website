import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          歡迎光臨 魔法食譜
        </Typography>
        <Typography variant="body1">
            這是一個為您提供食譜的平台。您可以在這裡找到各種美味的食譜，並且可以分享您自己的食譜。
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
