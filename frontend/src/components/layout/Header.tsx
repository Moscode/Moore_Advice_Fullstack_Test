import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ShoppingCartIcon sx={{ mr: 1 }} />
          Moore Advice
        </Typography>
        
        {isAuthenticated ? (
          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/products"
              sx={{ mr: 2 }}
            >
              Products
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ textTransform: 'none' }}
            >
              <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.light' }}>
                U
              </Avatar>
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            color="inherit"
            component={RouterLink}
            to="/login"
            variant="outlined"
            sx={{ color: 'white', borderColor: 'white' }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
