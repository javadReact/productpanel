import { createTheme } from '@mui/material/styles';


export const theme = createTheme({

    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        error: {
            main: '#ef5350',
        },
        success: {
            main: '#66bb6a',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b0b0b0',
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
    },
});

