import React from 'react';
import {Theme} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Grid, makeStyles, Typography} from '@material-ui/core';
import LoadingPage from "../../../../Layout/LoadingPage";
import ImageWrapper, {ImageWrapperVariants} from "../../../../Widget/ImageWrapper";
import {DrinkEvent} from "../../../../../types/server";
import {getEventImgPath, refactorTextLength} from "../../../../../apiUtils/common";

const useStyle = makeStyles((theme: Theme) => ({
    name: {
        fontSize: "26px",
        fontWeight: 100,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: "0.6px",
        color: theme.palette.text.primary,
        paddingBottom: '20px'
    }, category: {
        fontSize: '13px',
        color: theme.palette.secondary.light,
        marginTop: '15px',
    }, companyName: {
        fontSize: "16px",
        fontWeight: 100,
        paddingBottom: '10px',
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: "0.4px",
        color: theme.palette.text.secondary,
    }, date: {
        fontSize: "16px",
        fontWeight: 100,
        paddingBottom: '30px',
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: "0.4px",
        color: theme.palette.text.secondary,
    }, description: {
        fontSize: "14px",
        fontWeight: 100,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "1.43",
        letterSpacing: "0.6px",
        color: "#1d2027",
    }, root: {
        height: '100%',
        minHeight: '340px',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
    }, divImg: {
        height: '275px',
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f8f8f8'
    }, img: {
        height: '250px',
        cursor: 'pointer',
        width: '100%',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f8f8f8'
    }, oldPrice: {},
    price: {
        color: '#333333',
        fontFamily: 'arial',
        lineHeight: 1,
    },
    textWrapper: {
        padding: '20px',
        paddingTop: `25px`
    }
}));

interface Props extends RouteComponentProps {
    drinkEvent: DrinkEvent
}

const InnerSingleEvent: React.FunctionComponent<Props> = (props) => {
    const classes = useStyle();
    const {drinkEvent} = props;
    if (!drinkEvent) return <LoadingPage/>;
    return (
        <Grid container
              onClick={() => props.history.push(`/events/${drinkEvent.id}`)} className={classes.root}
              direction={'column'}>
            <ImageWrapper
                variant={ImageWrapperVariants.banner}
                src={getEventImgPath(drinkEvent.type)}
                className={classes.divImg}
            />
            <Grid item className={classes.textWrapper}>
                <Typography
                    variant={'h6'}
                    className={classes.name}
                >{refactorTextLength(drinkEvent.title, 24)}</Typography>
                <Typography className={classes.companyName}>
                    {refactorTextLength(drinkEvent.title, 20)}
                </Typography>
                <Typography className={classes.date}>
                    {drinkEvent.time}
                </Typography>
                <Typography className={classes.description}>
                    {`Posted on ${drinkEvent.time.slice(0, 10)}`}
                </Typography>

            </Grid>
        </Grid>
    );

};
//todo(added posted on date)


export const SingleEvent = React.memo(withRouter(InnerSingleEvent));