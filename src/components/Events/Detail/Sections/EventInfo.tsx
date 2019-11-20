import React from 'react';
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {RouteComponentProps, withRouter} from "react-router";
import {DrinkEvent} from "../../../../types/server";


interface Props extends RouteComponentProps {
    drinkEvent: DrinkEvent
}

const useStyles = makeStyles(theme => (
        {
            root: {
                //   borderBottom: `dashed 2px #000000`,
            },
            companyName: {

                fontSize: "35px",
                fontWeight: 300,
                paddingBottom: '10px',
                fontStyle: "normal",
                fontStretch: "normal",
                lineHeight: "normal",
                letterSpacing: "1.6px",

            },
            companyCategory: {
                color: `#6b6b6b`,
                cursor: 'pointer',
                marginBottom: `100px`,
                letterSpacing: "1.2px",

                '&:hover': {
                    textDecoration: "underline",
                },
                paddingTop: '10px',
            },
            img: {
                height: '145px',
                width: '145px',
                [theme.breakpoints.up('sm')]: {
                    marginRight: `40px`
                },
                border: `1px solid grey`,

            },
            postDate: {
                paddingBottom: '14px',
                opacity: .4,
                fontSize: "12px",
                fontWeight: "normal",
                fontStyle: "normal",
                fontStretch: "normal",
                lineHeight: "normal",
                letterSpacing: "1.5px",
                color: "#2e3947",
            }
        }
    )
);
const InnerEventDetailsCompanyInfo: React.FunctionComponent<Props> = props => {

    const {drinkEvent, history} = props;
    const classes = useStyles();
    return <Grid item xs={12} container alignItems={"center"} className={classes.root}>
        <Grid item>
            <Typography className={classes.postDate} children={`${drinkEvent.time.slice(0, 10)}`}/>
            <Typography className={classes.companyName} variant={'caption'}>
                {drinkEvent.title}
            </Typography>
            <Typography className={classes.companyCategory}
                        onClick={() => history.push(`/companies/${drinkEvent.id}`)}
                        children={drinkEvent.title}/>
        </Grid>
    </Grid>

};

export const EventDetailsCompanyInfo = withRouter(InnerEventDetailsCompanyInfo);