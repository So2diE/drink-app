import React, {useEffect, useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {LinearProgress} from "@material-ui/core";
import {CutInEffects, TransitionEffect} from "./CutInEffects";
import Collapse from "@material-ui/core/Collapse";
import {isMobile} from "../../apiUtils/common";

const fadeIn = `
  @keyframes gracefulimage {
    0%   { opacity: 0.25; }
    50%  { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;
const url = 'https://media.giphy.com/media/VseXvvxwowwCc/giphy.gif';

interface Props {
    src: string
    onClick?: () => void
    className?: string
    transitionEffect?: TransitionEffect
}

const useStyles = makeStyles(theme => (
    {
        img: {

            animationName: 'gracefulimage',
            animationDuration: '0.3s',
            animationIterationCount: 1,
            width: '100%',
            cursor: 'pointer',
            animationTimingFunction: 'ease-in',
        }
    }
));

export const HoverShowDetailBanner: FunctionComponentWithHTMLAttributes<Props> = props => {
    const classes = useStyles();
    const {transitionEffect} = props;
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(
        () => {

            const exists = document.head.querySelectorAll('[data-gracefulimage]');

            if (!exists.length) {
                const styleElement: any = document.createElement('style');
                // change exists attribute value to true
                styleElement.setAttribute('data-gracefulimage', 'exists');

                document.head.appendChild(styleElement);
                styleElement.sheet.insertRule(fadeIn, styleElement.sheet.cssRules.length);
            }
        }, [loaded]
    );
    const {
        onClick,
        src,
        children,
        className
    } = props;
    return <>
        {(!loaded) ? <LinearProgress/> : null}
        <CutInEffects
            transitionEffect={transitionEffect ? transitionEffect : TransitionEffect.collapse}
            delayTime={200}
            children={
                <>
                    <div
                        onMouseOver={() => setOpen(true)}
                        onMouseOut={() => setOpen(false)}
                        className={className}
                        onClick={onClick}
                        onLoad={() => setLoaded(true)}
                        style={
                            {
                                backgroundPosition: "center",
                                objectFit: 'cover',
                                width: "100%",
                                backgroundImage: `url("${src}")`,
                                display: !loaded ? 'none' : undefined,
                            }
                        }
                    >
                        <Collapse in={isMobile() ? isMobile() : open}>
                            <div
                                className={className}
                                style={
                                    {
                                        margin: 0,
                                        opacity: 0.7,
                                        backgroundColor: 'white'
                                    }
                                }
                                children={children}
                            />
                        </Collapse>
                    </div>
                    <img
                        src={src}
                        onLoad={() => setLoaded(true)}
                        style={{
                            display: 'none'
                        }}
                    />
                </>
            }/>

    </>

};
