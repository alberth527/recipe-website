import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

// 初始食谱数据
const initialRecipes = [
  { id: 1, title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
  { id: 2, title: 'Margherita Pizza', description: 'Simple yet delicious.' },
  { id: 3, title: 'Vegetable Stir Fry', description: 'A quick and healthy meal.' },
];

function MyRecipes() {
  const [recipes, setRecipes] = useState(initialRecipes);

  // 删除食谱
  const handleDelete = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  // 添加和编辑食谱的逻辑在这里实现
  // 注意: 这里仅展示了删除操作作为示例

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell component="th" scope="row">
                  {recipe.title}
                </TableCell>
                <TableCell>{recipe.description}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" onClick={() => {/* 编辑逻辑 */}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDelete(recipe.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MyRecipes;
