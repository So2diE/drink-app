import React, {useEffect, useState} from 'react';
import {Collapse, Fade, Grow, Slide, Zoom} from "@material-ui/core";

export enum TransitionEffect {

    collapse = 'collapse',
    fade = 'fade',
    grow = 'grow',
    slide = 'slide',
    zoom = 'zoom',
    none = 'none',
}

export interface CutInEffectsProps {
    transitionEffect?: TransitionEffect
    delayTime?: number
}

export const CutInEffects: FunctionComponentWithHTMLAttributes<CutInEffectsProps> = React.memo(props => {
    const [open, setOpen] = useState(false);
    const {transitionEffect, children, delayTime} = props;

    useEffect(() => {
        setTimeout(() => setOpen(true), (delayTime !== undefined) ? delayTime : 500)
    }, [delayTime]);

    return (() => {
        switch (transitionEffect) {
            case TransitionEffect.collapse:
                return <Collapse in={open} children={children}/>;
            case TransitionEffect.grow:
                return <Grow in={open} children={children}/>;
            case TransitionEffect.slide:
                return <Slide direction={"left"} in={open} mountOnEnter unmountOnExit children={children}/>;
            case TransitionEffect.zoom:
                return <Zoom in={open} children={children}/>;
            case TransitionEffect.none:
                return <>{children}</>;
            case TransitionEffect.fade:
            default:
                return <Fade in={open} children={children}/>
        }
    })()
});