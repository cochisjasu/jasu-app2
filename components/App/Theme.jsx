import { createTheme } from '@material-ui/core/styles';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#225D38',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#225D38',
            contrastText: '#ffffff'
        },
        background: {
            main: '#FFFFFF',
            card: '#FFFFFF'
        },
        gray: {
            main: '#404040'
        },
        white: {
            main: '#ffffff'
        },
        text:{
            black: '#323232'
        },
        green:{
            green40: '#DDF391',
            green70: '#8A9C4C',
            green90: '#556228',
            green100: '#3B451A',
            dark: '#225D38',
        },
        logo: {
            main: '#859E3D'
        }
    },
    typography: {
        h1: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '1.375rem',
            lineHeight: '1.625rem'
        },
        h2: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            color: '#202422',
            fontSize: '1.25rem',
            lineHeight: '1.625rem'
        },
        subtitle1: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: '1.375rem'
        },
        subtitle2: {
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            fontSize: '2.5rem',
            lineHeight: '3.75rem'
        },
        subtitle3: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: '1.375rem'
        },
        body1: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: '1.219rem'
        },
        body2: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            fontSize: '1rem',
            lineHeight: '1.219rem'
        },
        button: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: '1.219rem',
            textTransform: 'none',
        },
        caption: {
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.75rem',
        }
    },
        zIndex: {
        drawer: 1000
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1167,
            xl: 1920,
        }
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    backgroundColor: 'white',
                    overflowX: 'hidden'
                },
                "#__next":{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                },
            },
        },

        MUIRichTextEditor: {
            container: {
                minHeight: '480px'
            },
            inlineToolbar: {
                marginTop: '80px',
                maxWidth: '240px'
            }
        },

        MuiTypography: { 
            root: { 
                whiteSpace: "pre-wrap",
            },
        },
    }
});

export default Theme;
