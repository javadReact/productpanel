import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import styles from "./page.module.css";

export default function Home() {
  return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
              >
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                پنل مدریت محصولات
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </>
  );
}
