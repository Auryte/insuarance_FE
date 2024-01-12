import { createTheme, Theme } from '@mui/material/styles';
import '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    grey: string;
  }
}

const PRIMARY_COLOR = '#488A99';
const PRIMARY_COLOR_DARK = '#204051';
const PRIMARY_COLOR_LIGHT = '#84A9AC';
const SECONDARY_COLOR = '#CAE8D5';
const SECONDARY_COLOR_LIGHT = '#DBAE58';

export const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      dark: PRIMARY_COLOR_DARK,
      light: PRIMARY_COLOR_LIGHT,
    },
    secondary: {
      main: SECONDARY_COLOR,
      light: SECONDARY_COLOR_LIGHT,
    },
    common: {
      black: '#4D585B',
      white: '#FFFFFF',
      grey: '#C4C4C4',
    },
  },
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
    },
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.375,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        sizeSmall: {
          padding: '6px 36px',
        },
        sizeMedium: {
          padding: '8px 40px',
        },
        sizeLarge: {
          padding: '11px 44px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 16px',
        },
        textSizeLarge: {
          padding: '12px 16px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #eeeeee inset',
            WebkitTextFillColor: '#4D585B',
            focus: 'white',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #eeeeee inset',
            WebkitTextFillColor: '#4D585B',
            focus: 'white',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: 'green',
          color: 'white',
        },
        standardError: {
          backgroundColor: 'red',
          color: 'white',
        },
        standardWarning: {
          backgroundColor: 'orange',
          color: 'white',
        },
        standardInfo: {
          backgroundColor: 'blue',
          color: 'white',
        },
      },
    },
  },
});
