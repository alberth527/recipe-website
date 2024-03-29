// 假設這是從API獲取的食譜詳細信息
const recipeDetails = {
  1: {
    title: '義大利卡邦尼意粉',
    description: '經典的義式醬汁意粉，濃郁的奶油和培根風味。',
    ingredients: [
      '200g意粉',
      '100g培根',
      '2顆雞蛋',
      '1杯帕瑪森乳酪',
      '適量黑胡椒',
      '適量鹽',
    ],
    steps: [
      '將意粉煮熟，瀝乾水份。',
      '培根切條，用中火煎至微酥。',
      '雞蛋打散，與帕瑪森乳酪混合。',
      '將煎好的培根加入意粉中，關火後加入雞蛋和乳酪混合液，快速攪拌。',
      '根據口味加入黑胡椒調味。',
    ],
    imageUrl: 'https://source.unsplash.com/960x640/?Spaghetti Carbonara',
  },
  2: {
    title: '瑪格麗特披薩',
    description: '簡單卻美味的披薩，番茄、羅勒和莫札瑞拉乳酪的完美組合。',
    ingredients: [
      '1張披薩麵團',
      '2顆番茄',
      '200g莫札瑞拉乳酪',
      '新鮮羅勒葉幾片',
      '橄欖油少許',
      '鹽和黑胡椒適量',
    ],
    steps: [
      '披薩麵團上均勻塗抹橄欖油。',
      '將切片的番茄和莫札瑞拉乳酪鋪在麵團上。',
      '預熱烤箱至220度，將披薩放入烤約15分鐘。',
      '出爐後撒上新鮮羅勒葉，並用鹽和黑胡椒調味。',
    ],
    imageUrl: 'https://source.unsplash.com/960x640/?Margherita Pizza',
  },
  3: {
    title: '蔬菜炒飯',
    description: '快速健康的一餐，豐富的蔬菜搭配香噴噴的米飯。',
    ingredients: [
      '1碗隔夜米飯',
      '1根胡蘿蔔',
      '1顆青椒',
      '1顆洋蔥',
      '2瓣大蒜',
      '適量醬油',
      '適量鹽',
      '少許胡椒粉',
    ],
    steps: [
      '將胡蘿蔔、青椒、洋蔥切丁，大蒜切片。',
      '熱鍋加油，先爆香大蒜，再加入所有蔬菜翻炒。',
      '加入隔夜米飯，用大火快速翻炒均勻。',
      '依個人口味加入醬油、鹽和胡椒粉調味。',
    ],
    imageUrl: 'https://source.unsplash.com/960x640/?Vegetable Fried Rice',
  },
  4: {
    title: '印度咖哩雞',
    description: '濃郁香辣的印度風味咖哩，配以雞肉和香料長時間燉煮。',
    ingredients: [
      '500g雞腿肉',
      '2顆洋蔥',
      '2瓣大蒜',
      '1塊薑',
      '2湯匙咖哩粉',
      '400ml椰奶',
      '1杯雞湯',
      '鹽和胡椒適量',
    ],
    steps: [
      '雞腿肉切塊，洋蔥、大蒜、薑切末。',
      '鍋中加油，先將洋蔥炒至透明，加入大蒜和薑末炒香。',
      '加入咖哩粉和雞肉翻炒至雞肉變色。',
      '加入椰奶和雞湯，小火慢燉40分鐘。',
      '以鹽和胡椒調味後即可盛出。',
    ],
    imageUrl: 'https://source.unsplash.com/960x640/?Chicken Curry',
  },
  5: {
    title: '墨西哥牛肉捲餅',
    description: '道地的墨西哥街頭小吃，香辣牛肉搭配新鮮蔬菜和酸奶油。',
    ingredients: [
      '4張墨西哥捲餅皮',
      '500g牛肉片',
      '1顆洋蔥',
      '1顆番茄',
      '生菜適量',
      '酸奶油適量',
      '墨西哥辣椒醬適量',
      '鹽和胡椒適量',
    ],
    steps: [
      '洋蔥切絲，番茄切塊，生菜洗淨撕成小片。',
      '牛肉片用鹽和胡椒醃製。',
      '熱鍋加油，快炒牛肉片至五分熟，放入洋蔥絲續炒。',
      '將炒好的牛肉和洋蔥鋪在捲餅皮上，加入番茄塊和生菜，淋上酸奶油和辣椒醬。',
      '捲起捲餅皮，即可享用。',
    ],
    imageUrl: 'https://source.unsplash.com/960x640/?Beef Tacos',
  },
};


// RecipeDetail組件
import React from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, List, ListItem } from '@mui/material';

function RecipeDetail() {
  const { id } = useParams(); // 獲取路由參數中的食譜ID
  const recipe = recipeDetails[id]; // 從食譜詳細數據中獲取對應的食譜信息

 const navigate = useNavigate();

  if (!recipe) {
    return <Typography variant="h5">食譜不存在</Typography>;
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
          height="250"
          image={recipe.imageUrl}
          alt={recipe.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            食材
          </Typography>
          <List>
            {recipe.ingredients.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            ))}
          </List>
          <Typography gutterBottom variant="h5" component="div" sx={{ mt: 2 }}>
            製作步驟
          </Typography>
          <List>
            {recipe.steps.map((step, index) => (
              <ListItem key={index}>{`${index + 1}. ${step}`}</ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default RecipeDetail;
