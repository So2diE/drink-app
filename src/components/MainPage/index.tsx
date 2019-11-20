import * as React from 'react';
import {useContext} from 'react';
import {Grid} from "@material-ui/core";
import {reducer} from "../../context";
import LoadingPage from "../Layout/LoadingPage";
import {DrinkEvent} from "../../types/server";
import {SingleEvent} from "../Events/Overview/Sections/Slick/SingleEvent";


interface Props {

}

export const MainPage: FunctionComponentWithHTMLAttributes<Props> = props => {

    const {eventReducer} = useContext(reducer);
    if (!eventReducer.state.events) return <LoadingPage/>;

    return <Grid item container spacing={2} xs={12} children={eventReducer.state.events.map(
            (m: DrinkEvent, i: number) => <Grid item xs={4}
                children={<SingleEvent drinkEvent={m} key={i}/>}/>
        )}/>


};
export default MainPage