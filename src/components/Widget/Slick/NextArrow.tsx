import React from "react";
import {makeStyles} from "@material-ui/core";
import ImageWrapper from "../ImageWrapper";

const useStyles = makeStyles(theme => ({
    root: {
        '&:hover': {
            '&:before': {
                background: 'rgba(255, 255, 255, 0.8)',
                color: '#484848',
                opacity: 0.6,

            }
        },
        opacity: 0.5,
        borderRadius: '4px',
        padding: '28px 35px',
        position: 'absolute',
        top: '50%',
        cursor: 'pointer',
        right: '0px',
        background: '#484848',
        marginRight: '35px'
    },
    img: {
        height: '28px',
        width: `14px`
    }
}));

interface Props {
    style?: any
    onClick?: () => void
}

const NextArrow: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const {style, onClick} = props;
    return (
        <span
            className={classes.root}
            style={{...style,}}
            onClick={onClick}
        >

            <ImageWrapper className={classes.img} src={'/icon/right-w.png'}/>
        </span>


    )

};

export default (NextArrow)