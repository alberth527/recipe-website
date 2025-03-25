import { createTheme } from '@mui/material/styles';

// 創建自定義主題
const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // 綠色，代表健康飲食
      light: '#80e27e',
      dark: '#087f23',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff9800', // 橙色，代表美味食物
      light: '#ffc947',
      dark: '#c66900',
      contrastText: '#000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Noto Sans TC',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

export default theme;