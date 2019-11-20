import React, {useContext} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid} from "@material-ui/core";
import {EventDetailsSingleRelatedEvent} from "./SingleRelatedEvent";
import LoadingPage from "../../../../Layout/LoadingPage";
import {reducer} from "../../../../../context";

const useStyles = makeStyles(
    theme => ({
        root: {},
        img: {
            paddingTop: '120px',
            paddingBottom: '40px',
            height: '288px'
        }
    })
);

interface Props {

}

export const EventDetailsRelatedEvents: React.FunctionComponent<Props> = props => {
    const {eventReducer} = useContext(reducer);
    const {events} = eventReducer.state;
    const classes = useStyles();

    if (!events) return <LoadingPage/>;
    //just for layout showcase

    return <Grid item xs={12} spacing={3} container children=
        {
            events.map(
                (m, i) => <Grid item xs={12} md={6} key={i}
                                children={
                                    <EventDetailsSingleRelatedEvent drinkEvent={m}/>
                                }
                />
            )
        }/>
};