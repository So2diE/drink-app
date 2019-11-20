import React, {ReactElement} from 'react';
import {Grid, Typography, useTheme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ImageWrapper, {ImageWrapperVariants} from "../../../../../Widget/ImageWrapper";
import {isMobile} from "../../../../../../apiUtils/common";

interface Props {
    title: string
    value: ReactElement
    icon: string
}

const useStyles = makeStyles(theme => (
        {
            title: {
                fontSize: "30px",
                textTransform: 'capitalize',
                fontWeight: 100,
                fontStyle: "normal",
                fontStretch: "normal",
                lineHeight: "1.23",
                letterSpacing: "1.36px",
                color: "#6d6d6d",

            }, textCenter: {},
            value: {
                fontSize: isMobile() ? '20px' : "30px",
                fontWeight: 100,
                fontStyle: "normal",
                fontStretch: "normal",
                lineHeight: "1.23",
                paddingTop: '0px',
                letterSpacing: "1.36px",
                color: "#000000",
                marginBottom: '50px'
            },
            propertyTitle: {
                textTransform: "capitalize",
                paddingBottom: '10px',
                fontSize: "16px",
                fontWeight: 600,
                fontStyle: "normal",
                fontStretch: "normal",
                lineHeight: "normal",
                letterSpacing: "1.17px",
            },
            propertyWrapper: {
                paddingTop: '35px',

            }, propertyDetail: {
                fontSize: "16px",
                fontWeight: 300,
                color: '#6b6b6b',
                fontStyle: "normal",
                fontStretch: "normal",
                lineHeight: "normal",
                letterSpacing: "0.88px",
            },
        }
    )
);
export const EventDetailsSingleProperty: React.FunctionComponent<Props> = props => {
    const theme = useTheme();
    const {title, value, icon} = props;
    const classes = useStyles();

    return <>
        <Grid item container spacing={5} className={classes.propertyWrapper}>
            <Grid item xs={1}>
                <ImageWrapper src={`/icon/event/${icon}.png`} variant={ImageWrapperVariants.noStretch} width={20}
                              height={20}/>
            </Grid>

            <Grid item xs={11}>

                <Typography variant={'h6'} color={"secondary"} className={classes.propertyTitle}
                            children={title}/>
                <Typography variant={"body1"}

                            style={
                                title === 'website' ? {
                                    cursor: 'pointer',
                                    color: theme.palette.secondary.main,
                                } : {}
                            }
                            color={"primary"}
                            className={classes.propertyDetail} children={value || 'N / A'}/>
            </Grid>
        </Grid>


    </>
};