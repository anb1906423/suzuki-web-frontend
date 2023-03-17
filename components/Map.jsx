import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function Map() {
    return (
        <LoadScript
            googleMapsApiKey="AIzaSyA34fCdLwBGiUGjlMAnQ9dlXaC--fWlfM4"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
            </GoogleMap>
        </LoadScript>
    )
}

export default Map;