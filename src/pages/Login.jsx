import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Avatar,
  Link,
  Grid,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.full_name || !formData.password) {
      setError("用戶名稱和密碼為必填");
      return;
    }

    try {
      // 這裡將來會串接實際的 API
     const result = await login(formData.full_name, formData.password);
     console.log('登入回傳資料:', result);  // ✅ 登入成功後的資料
     localStorage.setItem("userId", result.data.full_name);  // 將 token 存入 
     navigate('/');  // 登入成功後導向首頁

      console.log("登入資料:", formData);

      // 模擬登入成功
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError("登入失敗，請檢查您的憑證");
      console.error("登入錯誤:", err);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 8, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            登入
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="full_name"
              label="用戶名稱"
              name="full_name"
              autoComplete="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登入
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘記密碼？
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"沒有帳號？立即註冊"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
