import React, {lazy, useCallback, useContext, useEffect, useState} from 'react';
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import {PanelHeader} from "./Layout/Header";
import {PanelDrawer} from "./Layout/Drawer";
import {useCommonLayoutStyles} from "./Layout/useCommonLayoutStyles";
import SuspenseFallback from "./Layout/SuspenseFallback";
import agent from "../agent";
import {reducer} from "../context";
import actionType from "../context/actionType";
import {DrinkEvent} from "../types/server";

const EventDetails = lazy(() => import('./Events/Detail'))
const MainPage = lazy(() => import("./MainPage"));

interface Props extends RouteComponentProps {
}


const App: React.FunctionComponent<Props> = props => {
    const classes = useCommonLayoutStyles();
    const {eventReducer} = useContext(reducer);
    const {events} = eventReducer.state;
    const [open, setOpen] = useState(false);

    const getEvents = useCallback((page = 1,events:DrinkEvent[]=[]) => {
        let pageSize = 1
        agent.Event.getEvents({
            pageSize: pageSize,
            page: page
        }).then(
            (res) => {
                const payload = [...events,...res.data];
                eventReducer.dispatch(
                    {
                        type: actionType.event.EVENT_INIT_EVENTS,
                        payload: {
                            events: payload,
                        }
                    }
                )

                if (res.data.length === pageSize) {
                    getEvents(page + 1,payload)
                }
            }
        ).catch(
            (err) => eventReducer.dispatch(
                {
                    type: actionType.event.EVENT_INIT_EVENTS,
                    payload: {
                        events: []
                    }
                }
            )
        )
    }, []);


    useEffect(getEvents, []);

    return (
        <div className={classes.root}>
            <PanelHeader handleDrawerOpen={() => setOpen(true)} open={open}/>
            <PanelDrawer handleDrawerClose={() => setOpen(false)} open={open}/>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <SuspenseFallback children={
                    <Switch>
                        <Route exact path={'/'} component={MainPage}/>
                        <Route exact path={`/events/:eventId`} component={EventDetails}/>
                        <Route exact component={MainPage}/>

                    </Switch>
                }/>
            </main>
        </div>
    );
};

export default (withRouter(App))
