import {createMuiTheme} from "@material-ui/core";
import React from "react";
import {ThemeProvider} from '@material-ui/styles'

enum themeColor {
    secondary = '#5DAB7C',
    background = '#E5CB90',
    primary = '#DBB561',
    textPrimary = '#4C3800',
    textSecondary = '#BB6B62',
}

export const Theme: React.ComponentType = ({children}) => {


    const themeOptions = {
        typography: {
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                'Righteous', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'
            ].join(','),
        },
        overrides: {
            MuiOutlinedInput: {},
        },
        palette: {
            primary: {
                main: themeColor.primary,
            },
            secondary: {
                main: themeColor.secondary
            },
            background: {
                default: "#ffffff",
                paper: themeColor.background,
            },

            // Used by `getContrastText()` to maximize the contrast between the background and
            // the text.
            contrastThreshold: 3,
            // Used to shift a color's luminance by approximately
            // two indexes within its tonal palette.
            // E.g., shift from Red 500 to Red 300 or Red 700.
            tonalOffset: 0.2,
        },
    };
    return <ThemeProvider theme={createMuiTheme(themeOptions)} children={children}/>
};