import React from 'react';
import {Theme} from "@material-ui/core/styles";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Grid, makeStyles, Typography} from '@material-ui/core';
import LoadingPage from "../../../../Layout/LoadingPage";
import ImageWrapper, {ImageWrapperVariants} from "../../../../Widget/ImageWrapper";
import {DrinkEvent} from "../../../../../types/server";
import {getEventImgPath, refactorTextLength} from "../../../../../apiUtils/common";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        height: '100%',
        minHeight: '340px',
        padding: '5px',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
    }, divImg: {
        height: '275px',
        cursor: 'pointer',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f8f8f8'
    },
    textWrapper: {
        padding: '10px',
        paddingTop: `25px`
    },
    creatorAvatar: {
        paddingRight: '10px'
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
                <Typography color={"textPrimary"}
                            variant={'h6'}
                >{refactorTextLength(drinkEvent.title, 24)}</Typography>
                <Grid item container alignItems={"center"}>
                    <ImageWrapper src={drinkEvent.creator.avatarUrl}
                                  disableLoadingProgress={true}
                                  width={50}
                                  height={50}
                                  className={classes.creatorAvatar}
                                  variant={ImageWrapperVariants.noStretch}/>
                    <Typography color={"textSecondary"}
                                children={refactorTextLength(drinkEvent.creator.name, 20)}
                    />
                </Grid>

                <Typography variant={"subtitle1"} color={"textPrimary"}
                            children={`${drinkEvent.comments.length} comment${drinkEvent.comments.length > 1 ? `s` : ''}`}
                />
                <Typography color={"textPrimary"}
                            children={`Event on ${drinkEvent.time.slice(0, 10)}`}
                />

            </Grid>
        </Grid>
    );

};
//todo(added posted on date)


export const SingleEvent = React.memo(withRouter(InnerSingleEvent));