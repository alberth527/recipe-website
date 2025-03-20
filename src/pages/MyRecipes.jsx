import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogTitle, TextField, DialogContent, DialogActions, Button, CardMedia, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { fetchRecipes } from '../api';

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 從 API 取得菜譜資料
useEffect(() => {
  fetchRecipes()
    .then(data => {
      if (Array.isArray(data.data)) {
        setRecipes(data.data);
      } else {
        setError('API 回傳的資料格式不正確');
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('API 錯誤:', error);
      setError('無法載入菜譜資料，請稍後再試。');
      setLoading(false);
    });
}, []);

  // 删除食谱
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5066/api/Recipe/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`刪除失敗: ${response.status}`);
      }
      
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error('刪除菜譜時發生錯誤:', error);
      // 可以在這裡加入錯誤處理，例如顯示錯誤訊息
    }
  };

  // 添加和编辑食谱的逻辑在这里实现
  const handleEditClick = (recipe) => {
    setCurrentRecipe(recipe);
    setOpenDialog(true);
  };

  const handleAddClick = () => {
    setCurrentRecipe({});
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    try {
      let url = 'http://localhost:5066/api/Recipe';
      let method = 'POST';
      
      if (currentRecipe.id) {
        url = `${url}`;
        method = 'patch';
      }
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentRecipe),
      });
      
      if (!response.ok) {
        throw new Error(`儲存失敗: ${response.status}`);
      }
      
      // 重新獲取菜譜資料以取得最新狀態
      const updatedResponse = await fetch('http://localhost:5066/api/Recipe');
      if (!updatedResponse.ok) {
        throw new Error(`重新獲取失敗: ${updatedResponse.status}`);
      }
      
      const updatedData = await updatedResponse.json();
      if (Array.isArray(updatedData)) {
        setRecipes(updatedData);
      }
      
      setOpenDialog(false);
    } catch (error) {
      console.error('儲存菜譜時發生錯誤:', error);
      // 可以在這裡加入錯誤處理，例如顯示錯誤訊息
    }
  };

  // Debug info
  console.log('Rendering component with:', {
    recipes: recipes,
    isArray: Array.isArray(recipes),
    length: recipes ? recipes.length : 0,
    loading
  });

  if (loading) {
    return (
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p style={{ color: 'red' }}>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', marginTop: '20px' }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          新增菜譜
        </Button>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{currentRecipe.id ? '編輯菜譜' : '新增菜譜'}</DialogTitle>
        <DialogContent>
          {currentRecipe.title && (
            <CardMedia
              component="img"
              image={`${currentRecipe.image_url}`}
              alt="Recipe Image"
              style={{ width: '100%', height: '100%', marginTop: '10px' }}
            />
          )}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="標題"
            type="text"
            fullWidth
            value={currentRecipe.title || ''}
            onChange={(e) => setCurrentRecipe({ ...currentRecipe, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="描述"
            type="text"
            fullWidth
            value={currentRecipe.description || ''}
            onChange={(e) => setCurrentRecipe({ ...currentRecipe, description: e.target.value })}
          />
          {/* 在这里添加更多字段 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            取消
          </Button>
          <Button onClick={handleSave} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
      
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>標題</TableCell>
              <TableCell>描述</TableCell>
              <TableCell align="right">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(recipes) && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell component="th" scope="row">
                    {recipe.title}
                  </TableCell>
                  <TableCell>{recipe.description}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" onClick={() => handleEditClick(recipe)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(recipe.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  沒有資料
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MyRecipes;