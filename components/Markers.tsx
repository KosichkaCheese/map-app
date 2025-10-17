import { useRouter } from "expo-router";
import React from 'react';
import { Marker } from "react-native-maps";
import { MarkerType, MarkersNavigationProps } from "../types";

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
                        image={require('../assets/images/marker.png')}

                        onPress={() => {
                            try {
                                const params: MarkersNavigationProps = {
                                    id: index.toString(),
                                    latitude: marker.latitude.toString(),
                                    longitude: marker.longitude.toString(),
                                }
                                router.push({
                                    pathname: "/marker/[id]",
                                    params,
                                });
                            } catch (e) {
                                console.log('Ошибка навигации: ', e);
                                alert('Не удалось открыть детали маркера');
                            }
                        }}
                    />
                );
            })}
        </>
    );
}