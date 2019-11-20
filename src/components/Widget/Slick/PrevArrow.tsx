import React from "react";
import {Theme} from '@material-ui/core/styles';
import createStyles from "@material-ui/core/styles/createStyles";
import {makeStyles} from "@material-ui/core";
import ImageWrapper from "../ImageWrapper";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        '&:hover': {
            '&:before': {
                background: 'rgba(255, 255, 255, 0.8)',
                color: '#484848',
                opacity: 0.6,
            }
        },
        borderRadius: '4px',
        opacity: 0.5,

        padding: '28px 35px',
        position: 'absolute',
        top: '50%',
        cursor: 'pointer',

        background: '#484848',
        marginLeft: '35px',
        color: '#484848',
        zIndex: 2,
    }, img: {
        height: '28px',
        width: `14px`
    }
}));

interface Props {
    style?: any
    onClick?: () => void
}

const PrevArrow: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const {style, onClick} = props;
    return (
        <span
            className={classes.root}
            style={{...style,}}
            onClick={onClick}>
        <ImageWrapper className={classes.img} src={'/icon/left-w.png'}/>
        </span>


    )

};

export default (PrevArrow)