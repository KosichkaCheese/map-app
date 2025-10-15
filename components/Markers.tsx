import React from 'react';
import { Marker } from "react-native-maps";
import { MarkerType } from "../types";

type MarkersProps = {
    markers: MarkerType[];
};

export default function Markers({ markers }: MarkersProps) {
    return (
        <>
            {markers.map((marker, index) => {
                return (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                    />
                );
            })}
        </>
    );
}