import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {RouteComponentProps, withRouter} from "react-router";
import {Typography} from "@material-ui/core";
import {HoverShowDetailBanner} from "../../../../Widget/HoverShowDetailBanner";
import Grid from "@material-ui/core/Grid";
import ImageWrapper from "../../../../Widget/ImageWrapper";
import {DrinkEvent} from "../../../../../types/server";
import {getEventImgPath} from "../../../../../apiUtils/common";

const useStyles = makeStyles(
    theme => ({
        root: {},
        img: {
            cursor: 'pointer',
            height: '270px',
            marginTop: '30px',
            marginBottom: '30px',
        },
        innerRoot: {
            padding: '10px',

            height: '100%'
        },
        companyLogo: {},
        subTitle: {
            fontWeight: 900,
            fontSize: '20px',
        },
        title: {
            textTransform: 'capitalize',
            fontWeight: 900,
            fontSize: '25px',
        }, visit: {
            textTransform: 'capitalize',
            fontWeight: 900,
            fontSize: '10px',
            color: 'grey',
        },
        visitSection: {}
    })
);

interface Props extends RouteComponentProps {
    drinkEvent: DrinkEvent
}

const InnerEventDetailsSingleRelatedEvent: React.FunctionComponent<Props> = props => {
    const {drinkEvent, history} = props;
    const classes = useStyles();
    return <><HoverShowDetailBanner src={getEventImgPath(drinkEvent.type)}

                                    onClick={() => {
                                        history.push(`/events/details/${drinkEvent.id}`)
                                    }}
                                    className={classes.img}
                                    children={
                                        <Grid item container
                                              className={classes.innerRoot}
                                              direction={"column"}
                                              justify={"space-between"}>
                                            <Grid item container spacing={5} alignItems={"center"}>
                                                <Grid item xs={4} md={3}>
                                                    <ImageWrapper
                                                        className={classes.companyLogo}
                                                        src={getEventImgPath(drinkEvent.type)}/>
                                                </Grid>
                                                <Grid item md={9} container xs={8}>
                                                    <Grid item xs={12}>
                                                        <Typography variant={"h6"} className={classes.title}
                                                                    color={"secondary"}>
                                                            work in
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant={"subtitle1"} className={classes.subTitle}
                                                                    color={"primary"}>
                                                            standard Chartered bank
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item className={classes.visitSection}>
                                                <Typography className={classes.visit}>
                                                    visit:
                                                </Typography>
                                                <Typography className={classes.subTitle} color={"secondary"}>
                                                    www.myjobmagic.org
                                                </Typography>
                                            </Grid>
                                        </Grid>

                                    }

    />
    </>
};

export const EventDetailsSingleRelatedEvent = withRouter(InnerEventDetailsSingleRelatedEvent);