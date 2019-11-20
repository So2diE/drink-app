import React, {ReactNode} from "react";
import {Grid, makeStyles} from "@material-ui/core";
import SectionsWrapper from "../../../../Layout/SectionsWrapper";

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'hidden',
        paddingRight: '10%',
        paddingLeft: '10%',
    },
    title: {
        paddingTop: '8%',
        textTransform: `capitalize`,
        fontSize: "45px",
        fontWeight: 100,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "0.73",
        letterSpacing: "1px",
        textAlign: "center",
        paddingBottom: '50px',
        color: theme.palette.primary.main,
    },

}));

interface Props {
    data: ReactNode
}


export const SingleSlickWrapper: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
    const data = props.data;
    return <Grid spacing={2} xs={12} item container className={classes.root}
                 children={<SectionsWrapper
                     children={<Grid md={9} xs={12}
                                     spacing={4} item
                                     container
                                     children={data}
                     />}/>}/>
};