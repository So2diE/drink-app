import * as React from 'react'
import {Grid, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: '40px',
        marginTop: '200px',
        marginBottom: '200px',

    }
}));

interface Props {
    msg?: string
}

const NotFound: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const {msg} = props;
    return (
        <Grid container justify={'center'} alignItems={'center'} className={classes.root}>
            <Typography
                variant={'subtitle1'}>{msg ? msg : "cant't find current page due to network problem"}</Typography>
        </Grid>);
};


export default (NotFound)