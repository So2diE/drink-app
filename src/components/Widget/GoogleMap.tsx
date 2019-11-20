import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PlaceOutlined} from '@material-ui/icons';
import ImageWrapper, {ImageWrapperVariants} from "./ImageWrapper";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(
    theme=>({
        root:{
            backgroundColor:'inherit'
        }
    })
)
const SimpleMap = () => {
    const classes = useStyles();
    const defaultProps = {
        center: {
            lat:    22.3224272,
            lng: 114.1640317
        },
        zoom: 17
    };
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '390px', width: '100%', marginBottom: `300px`}}
                 children={
                     <GoogleMapReact
                         bootstrapURLKeys={{key: 'AIzaSyDrmv1sZDViMVf8iXPkGOPQ2ZsWlzAEUeo'}}
                         defaultCenter={defaultProps.center}
                         defaultZoom={defaultProps.zoom}
                         children={<ImageWrapper
                             className={classes.root}
                             src={'/icon/event/location1.png'}
                             width={50}
                             height={50}
                             variant={ImageWrapperVariants.noStretch}
                         />

                         }
                     />
                 }
            />
        );
}

export default SimpleMap;