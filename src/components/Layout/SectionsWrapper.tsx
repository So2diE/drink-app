import * as React from 'react';
import {Grid, makeStyles, Theme} from '@material-ui/core';

const useStyle = makeStyles(
    (theme: Theme) => ({
        root: {
            maxWidth: '1280px',
        },
    }));

interface Props {
    children: JSX.Element
}

const SectionsWrapper: React.FunctionComponent<Props> = props => {

    const {
        children
    } = props;

    const classes = useStyle();
    return (
        <Grid container justify={'center'} alignItems={'center'}>
            <Grid item container justify={'center'} alignItems={'center'} className={classes.root}>
                {children}
            </Grid>
        </Grid>

    );
};


export default SectionsWrapper