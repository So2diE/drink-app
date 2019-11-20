import React, {useCallback, useEffect, useState} from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import classNames from 'classnames'
import {CircularProgress, LinearProgress} from "@material-ui/core";
import {CutInEffects, CutInEffectsProps, TransitionEffect} from "./CutInEffects";
import {handleImgValid, isImgCached} from "../../apiUtils/common";


export enum ImageWrapperVariants {
    banner = "banner",
    background = 'background',
    image = "image",
    noStretch = 'noStretch',


}

interface Props extends CutInEffectsProps {
    src: string
    variant?: ImageWrapperVariants
    delayTime?: number
    onClick?: () => void
    className?: string
    linearProgress?: boolean
    disableLoadingProgress?: boolean
    height?: number
    width?: number
    alt?: string

}

const useStyles = makeStyles(theme => (
    {
        img: {
            animationDuration: '0.3s',
            animationIterationCount: 1,
            width: props => props.width ? `${props.width}px` : '100%',
            src: props => handleImgValid(props.src),
            cursor: 'pointer',
            animationTimingFunction: 'ease-in',
            display: props => !props.loaded ? 'none' : 'flex',
        },
        banner: (props: Props) => {
            const {height, width, src} = props;
            return ({
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: width ? `${width}px` : '100%',
                height: height ? `${height}px` : '100%',
                backgroundImage: `url("${handleImgValid(src)}")`,
                display: 'flex'
            })
        },
        noStretch: {
            height: (props: Props) => `${props.height}px`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'white',
            objectFit: 'cover',
            width: props => props.width ? `${props.width}px` : '100%',
            backgroundImage: (props: Props & { loaded: boolean }) => `url("${handleImgValid(props.src)}")`,
            display: (props) => !props.loaded ? 'none' : 'inherit',
        },
        background: {
            backgroundImage: (props: Props & { loaded: boolean }) => props.loaded ? `url("${handleImgValid(props.src)}")` : 'none',
            objectFit: "cover",
            width: props => props.width ? `${props.width}px` : '100%',
            transition: `background-image 1s ease-in-out`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",


        }
    }
));

export const ImageWrapper: FunctionComponentWithHTMLAttributes<Props> = props => {

    const {
        className, onClick, children,
        transitionEffect, disableLoadingProgress,
        linearProgress, variant, delayTime, alt
    } = props;
    const src = handleImgValid(props.src);
    const [loaded, setLoaded] = useState(false);
    const stored = isImgCached(src);
    const isVisible = stored || loaded || variant === ImageWrapperVariants.background;
    const classes = useStyles({loaded: loaded, ...props});
    const [data,] = useState(() => {
        const getTransitionEffect = () => {
            switch (true) {
                case stored:
                    return TransitionEffect.none;
                case !!transitionEffect:
                    return transitionEffect;
                case variant === ImageWrapperVariants.background:
                    return TransitionEffect.fade;
                case variant === ImageWrapperVariants.noStretch:
                case variant === ImageWrapperVariants.banner:
                    return TransitionEffect.collapse;
                case variant === ImageWrapperVariants.image:
                default:
                    return TransitionEffect.grow;
            }
        };
        const getDelayTime = () => {
            switch (true) {
                case !!delayTime:
                    return delayTime;
                case variant === ImageWrapperVariants.background:
                case variant === ImageWrapperVariants.noStretch:
                case variant === ImageWrapperVariants.banner:
                    return 200;
                case variant === ImageWrapperVariants.image:
                default:
                    return 250;
            }
        };
        return ({
            delayTime: getDelayTime(),
            transitionEffect: getTransitionEffect(),
        })
    });
    const initImgLoad = useCallback(
        () => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setLoaded(true)
            }
        }, [src]);
    useEffect(initImgLoad, []);
    const LoadingProgress = () => {
        switch (true) {
            case linearProgress:
            case variant === ImageWrapperVariants.background:
            case variant === ImageWrapperVariants.banner:

                return <LinearProgress/>;
            case !linearProgress:
            case variant === ImageWrapperVariants.image:
            case variant === ImageWrapperVariants.noStretch:
            default:

                return <CircularProgress/>;
        }
    };
    const needLoadingPage = (!loaded && !disableLoadingProgress);
    const getCoreImg = () => {
        switch (variant) {
            case ImageWrapperVariants.banner:
                return <div onClick={onClick} children={children}
                            className={classNames(classes.banner, className)}/>;
            case ImageWrapperVariants.noStretch:
                return <div onClick={onClick} children={children}
                            className={classNames(classes.noStretch, className)}/>;
            case ImageWrapperVariants.background:
                return <div onClick={onClick} children={children}
                            className={classNames(classes.background, className)}/>;
            case ImageWrapperVariants.image:
            default:
                return <img alt={alt ? alt : src} src={src} onClick={onClick}
                            className={classNames(classes.img, className)}/>
        }
    };
    return <>
        {needLoadingPage && <LoadingProgress/>}
        {isVisible && <CutInEffects {...data} children={getCoreImg()}/>}
    </>
};

export default React.memo(ImageWrapper)