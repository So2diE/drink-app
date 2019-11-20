import React, {useContext} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {EventDetailsBanner} from "./Sections/Banner";
import {RouteComponentProps, withRouter} from "react-router";
import {EventsDetailsBody} from "./Sections/Body";
import {EventDetailsCompanyInfo} from "./Sections/CompanyInfo";
import {EventDetailsRelatedEvents} from "./Sections/RelatedEvents";
import SectionsWrapper from "../../Layout/SectionsWrapper";
import {Grid} from "@material-ui/core";
import {EventCreatorLogo} from "./Sections/CreatorLogo";
import {reducer} from "../../../context";
import {DrinkEvent} from "../../../types/server";
import agent from "../../../agent";
import LoadingPage from "../../Layout/LoadingPage";
import NotFound from "../../Layout/NotFound";
import {getEventImgPath} from "../../../apiUtils/common";

interface Props extends RouteComponentProps<{ eventId: string }> {
}

const useStyles = makeStyles(
    theme => ({
        root: {
            marginBottom: '100px',
        }
    })
);
const InnerEventDetails: React.FunctionComponent<Props> = props => {

    const classes = useStyles();
    const {eventReducer} = useContext(reducer);
    const eventId = props.match.params.eventId;
    const {events} = eventReducer.state;
    if (!events) return <LoadingPage/>;
    let selectedEvent = events.find((n: DrinkEvent) => n.id.toString() === eventId);
    if (!selectedEvent) {
        agent.Event.getSingleEvent(eventId).then(
            res => {
                selectedEvent = res.data
            }
        ).then(
            err => {

            }
        )
    }
    console.log('4214124')
    if (!selectedEvent) return <NotFound/>;
    return <>
        <EventDetailsBanner title={selectedEvent.title} description={selectedEvent.time}
                            img={getEventImgPath(selectedEvent.type)}/>
        <SectionsWrapper
            children={
                <Grid item xs={10} lg={9} container className={classes.root} direction={'row-reverse'}>
                    <Grid item xs={12} md={4} children={<EventCreatorLogo selectedEvent={selectedEvent}/>}/>
                    <Grid item md={1}/>
                    <Grid item xs={12} md={7}>
                        <EventDetailsCompanyInfo drinkEvent={selectedEvent}/>
                        <EventsDetailsBody drinkEvent={selectedEvent}/>
                        <EventDetailsRelatedEvents/>
                    </Grid>
                </Grid>
            }
        />

    </>
};

export const EventDetails = withRouter(InnerEventDetails);
export default EventDetails