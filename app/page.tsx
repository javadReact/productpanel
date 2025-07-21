import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Divider, IconButton, InputBase, Paper, TextField} from "@mui/material";
import styles from "./page.module.css";
import DataTable from "@/components/table/page";

export default function Home() {
  return (
      <>
        <Box>
          <AppBar position="static"
          >
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
              <Typography variant="h6" component="div">
                پنل مدریت محصولات
              </Typography>
                <Box>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <IconButton sx={{ p: '10px' }} aria-label="menu">

                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="محصول خود را جستجو کنید..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <Button type="button">
                            جستجو
                        </Button>

                    </Paper>
                </Box>
            </Toolbar>
          </AppBar>

            <DataTable />
        </Box>
      </>
  );
}
