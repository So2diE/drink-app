import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid} from "@material-ui/core";
import {EventDetailsSingleProperty} from "./Sections/SingleProperty";
import {DrinkEvent} from "../../../../../types/server";

interface Props {
    drinkEvent: DrinkEvent
}

const useStyles = makeStyles(theme => ({
    button: {
        textTransform: 'capitalize',
        fontSize: "30px",
        fontWeight: 300,
        fontStyle: "normal",
        fontStretch: "normal",
        lineHeight: "normal",
        letterSpacing: "1.5px",
        textAlign: "center",
        color: "#ffffff",
        padding: '20px 30px'
    },
    icon: {
        height: '45px',
        width: '45px',
        paddingRight: '10px',
    },
}));
export const EventsDetailsBody: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const {drinkEvent} = props;
    const propertyList = [
        {
            "label": "title",
            "icon": "phone",
            "value": "title"
        },
        {
            "label": "event information",
            "icon": "detail",
            "value": "eventInformation"
        }
    ];

    return <Grid direction={"column"} container children={

        propertyList.map(
            (m, i) => {
                const temp = Object.entries(drinkEvent)
                    .find(n => n[0] === m.value);
                if (temp) {
                    return <EventDetailsSingleProperty
                        key={i}
                        title={m.label}
                        icon={m.icon}
                        value={temp[1]}
                    />
                }
            }
        )

    }/>
};



