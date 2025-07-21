import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Paper} from "@mui/material";

export default function Navbar() {
    return (
        <>
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
                                <Button type="button" href='/addproduct'>
                                    افزودن محصول
                                </Button>
                    </Toolbar>
                </AppBar>
        </>
    );
}
