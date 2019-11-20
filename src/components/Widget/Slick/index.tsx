import React, {
    forwardRef,
    ForwardRefExoticComponent,
    PropsWithoutRef,
    ReactNode,
    RefAttributes,
    useEffect,
    useImperativeHandle,
    useState
} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import {Grid} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    slide: {
        display: 'flex',
    }

}));

export interface SlickRefProps {
    slickGoTo: (num: number) => void

}

interface Props {
    isAutoPlay?: boolean;
    timeout?: number;
    data: Array<ReactNode>
    disableArrow?: boolean;
}

// ref usage in parent
// const slickRef = useRef<SlickRefProps>(null);
// <Slick ref={slickRef} data={imgArr.map(m => <Banner height={400} src={m.url}/>)}/>
// () => {
//     const isSlickRefExist = slickRef.current;
//     if (isSlickRefExist) {
//         isSlickRefExist.slickGoTo(slide)
//     }
// }

type T = PropsWithoutRef<Props> & RefAttributes<SlickRefProps>

export const Slick: ForwardRefExoticComponent<T> = forwardRef((props, ref) => {
    const {isAutoPlay, timeout, data, disableArrow} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [timeoutID, setTimeoutId] = useState();
    const handleChange = (num: number) => {
        setActiveStep((() => {
            switch (true) {
                case num >= data.length:
                    return 0;
                case num < 0:
                    return data.length - 1;
                default:
                    return num
            }
        }))

    };
    //auto play
    const autoPlay = () => isAutoPlay ? setTimeoutId(setTimeout(() => {
        handleChange(activeStep + 1)
    }, timeout ? timeout : 5000)) : null;
    useEffect(() => {
        clearTimeout(timeoutID);
        autoPlay();
    }, [activeStep]);


    //remotable
    useImperativeHandle(ref, () => ({
                slickGoTo: (num: number) => handleChange(num),
            }
        )
    );


    return (
        <div className={classes.root}>
            {/*with arrow*/}
            {!disableArrow && <>
                <PrevArrow onClick={() => handleChange(activeStep - 1)}/>
                <NextArrow onClick={() => handleChange(activeStep + 1)}/></>}
            <SwipeableViews
                slideClassName={classes.slide}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}

                onChangeIndex={(num: number) => setActiveStep(num)}
                enableMouseEvents
                children={data.map((node, i) => <Grid key={i} item xs={12}>{node}</Grid>)}
            />
        </div>
    );
});

