import { useRouter } from "expo-router";
import React from 'react';
import { Alert } from "react-native";
import { Marker } from "react-native-maps";
import { Marker as MarkerType, MarkersNavigationProps } from "../types";

type MarkersProps = {
    markers: MarkerType[];
};

export default function Markers({ markers }: MarkersProps) {
    const router = useRouter();

    return (
        <>
            {markers.map((marker) => {
                return (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        image={require('../assets/images/marker.png')}

                        onPress={() => {
                            if (!marker.id) {
                                Alert.alert('Ошибка', 'Невозможно открыть детали маркера', [{ text: 'OK' }]);
                                return;
                            }
                            try {
                                const params: MarkersNavigationProps = {
                                    id: marker.id.toString(),
                                    latitude: marker.latitude.toString(),
                                    longitude: marker.longitude.toString(),
                                }
                                router.push({
                                    pathname: "/marker/[id]",
                                    params,
                                });
                            } catch (e) {
                                console.log('Ошибка навигации: ', e);
                                Alert.alert('Ошибка', 'Не удалось открыть детали маркера', [{ text: 'OK' }]);
                            }
                        }}
                    />
                );
            })}
        </>
    );
}