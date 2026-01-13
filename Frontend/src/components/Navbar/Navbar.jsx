import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from './Menu';
import ShortMenu from './ShortMenu';
import football from '../../assets/football.png';
import IconButton from '@mui/material/IconButton';

const drawerWidth = 240;
const shortWidth = 60;

export default function Navbar({ content }) {
  const [isBigMenu, setIsBigMenu] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
            <IconButton
              color="inherit"
              sx={{ marginRight: '35px' }}
              onClick={() => setIsBigMenu(!isBigMenu)}
            >
              {isBigMenu ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          <img
            src={football}
            alt="Football"
            style={{
              width: '120px',
              height: '40px',
              objectFit: 'cover',
              borderRadius: '10px',          // curved edges
              transform: 'scaleX(1.15)',     // slight horizontal stretch
            }}
            
            // onClick={() => setIsBigMenu(!isBigMenu)} // toggle menu
          />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: isBigMenu ? drawerWidth : shortWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isBigMenu ? drawerWidth : shortWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        {isBigMenu ? <Menu /> : <ShortMenu />}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
