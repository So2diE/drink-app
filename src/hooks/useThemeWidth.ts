import {Theme} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import {breakpoints} from "../constants/enum";
import useMediaQuery from "@material-ui/core/useMediaQuery";

interface result {
    width: Breakpoint
    isWidthUp: {
        xl: boolean
        lg: boolean
        md: boolean
        sm: boolean
        xs: boolean
    }
    isWidthDown: {
        xl: boolean
        lg: boolean
        md: boolean
        sm: boolean
        xs: boolean
    }
}

const useIsWidthUp = (breakpoint: Breakpoint, theme: Theme): boolean => useMediaQuery(theme.breakpoints.up(breakpoint));
const useIsWidthDown = (breakpoint: Breakpoint, theme: Theme): boolean => useMediaQuery(theme.breakpoints.down(breakpoint));
const useIsWidthOnly = (breakpoint: Breakpoint, theme: Theme): boolean => useMediaQuery(theme.breakpoints.only(breakpoint));


export const useThemeWidth = (): result => {

    const theme: Theme = useTheme();

    const isWidthUpXl = useIsWidthUp(breakpoints.xl, theme);
    const isWidthUpLg = useIsWidthUp(breakpoints.lg, theme);
    const isWidthUpMd = useIsWidthUp(breakpoints.md, theme);
    const isWidthUpSm = useIsWidthUp(breakpoints.sm, theme);
    const isWidthUpXs = useIsWidthUp(breakpoints.xs, theme);

    const isWidthDownXl = useIsWidthDown(breakpoints.xl, theme);
    const isWidthDownLg = useIsWidthDown(breakpoints.lg, theme);
    const isWidthDownMd = useIsWidthDown(breakpoints.md, theme);
    const isWidthDownSm = useIsWidthDown(breakpoints.sm, theme);
    const isWidthDownXs = useIsWidthDown(breakpoints.xs, theme);
    let width = (useIsWidthOnly(breakpoints.xl, theme)) ? breakpoints.xl : breakpoints.xs;
    width = useIsWidthOnly(breakpoints.lg, theme) ? breakpoints.lg : width;
    width = useIsWidthOnly(breakpoints.md, theme) ? breakpoints.md : width;
    width = useIsWidthOnly(breakpoints.sm, theme) ? breakpoints.sm : width;

    return {
        width: width,
        isWidthUp: {
            xl: isWidthUpXl,
            lg: isWidthUpLg,
            md: isWidthUpMd,
            sm: isWidthUpSm,
            xs: isWidthUpXs,
        },
        isWidthDown: {
            xl: isWidthDownXl,
            lg: isWidthDownLg,
            md: isWidthDownMd,
            sm: isWidthDownSm,
            xs: isWidthDownXs,
        }
    }
};

