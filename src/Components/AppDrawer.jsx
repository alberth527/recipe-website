import React, { useState ,useEffect} from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout'; // 导入登出图标
import HomeIcon from '@mui/icons-material/Home';// 导入主页图标

import { useNavigate,Link } from 'react-router-dom'; // 如果你使用React Router

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function AppDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate(); // 如果你使用React Router
  const [userId, setUserId] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    // 当组件加载时获取用户信息
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  // 登出函数
  const handleLogout = () => {
    // 清除localStorage中的用户信息或执行其他登出逻辑
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    // 登出后重定向到home页
    navigate("/"); //使用React Router进行页面跳转
  };
  // 處理搜尋輸入變更
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // 處理搜尋提交
  const handleSearchSubmit = (event) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // 點擊搜尋圖標時的處理函數
  const handleSearchIconClick = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 0 }}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            魔法食譜
          </Typography>
          <Search>
            <SearchIconWrapper onClick={handleSearchIconClick}>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearchChange}
              onKeyPress={handleSearchSubmit}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {userId && (
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="首頁" />
            </ListItem>
          )}

          {userId && (
            <ListItem button>
              <ListItemIcon>
                <StarBorderIcon />
              </ListItemIcon>
              <ListItemText primary="我的收藏" />
            </ListItem>
          )}

          {userId && (
            <ListItem button component={Link} to="/my-recipes">
              <ListItemIcon>
                <LocalDiningIcon />
              </ListItemIcon>
              <ListItemText primary="我的私房菜" />
            </ListItem>
          )}
          {userId && (
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="設置" />
            </ListItem>
          )}
          {userId && (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="登出" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
