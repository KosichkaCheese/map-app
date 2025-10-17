import { useRouter } from "expo-router";
import React from 'react';
import { Marker } from "react-native-maps";
import { MarkerType } from "../types";

type MarkersProps = {
    markers: MarkerType[];
};

export default function Markers({ markers }: MarkersProps) {
    const router = useRouter();

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

                        onPress={() => {
                            router.push({
                                pathname: "/marker/[id]",
                                params: {
                                    id: index.toString(),
                                    latitude: marker.latitude,
                                    longitude: marker.longitude,
                                },
                            });
                        }}
                    />
                );
            })}
        </>
    );
}