import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Container
          maxWidth={false} disableGutters
          component="main"
          sx={{
            flexGrow: 1,
            py: 4,
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Outlet />
        </Container>
      </Box>
    );
};

export default Layout;