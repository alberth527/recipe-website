import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
     // 檢查帳號和密碼
  if (email === 'demo' && password === 'demo') {
   
    // 登錄成功，導航到"recipes"頁面
     localStorage.setItem('isLoggedIn', true);
      navigate('/');
  } else {
    // 登入失敗
    console.log('Invalid username or password');
  }
    console.log('Login details', { email, password });
  };
   const handleLogout = () => {
    // 在這裡添加你的登出邏輯
    // 例如，清除用戶的登錄狀態，然後導航到登錄頁面
     localStorage.removeItem('isLoggedIn');
   
    navigate('/login');
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
                <Button onClick={handleLogout}>Logout</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
