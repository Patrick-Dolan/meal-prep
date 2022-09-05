import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#52a706',
      contrastText: '#ffebee',
    },
    secondary: {
      main: '#403c26',
    },
    background: {
      default: '#fffadd',
    },
    divider: 'rgba(0,0,0,0.24)',
  },
});