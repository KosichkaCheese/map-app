import React from 'react';
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

type MapProps = {
    children?: React.ReactNode; // <- разрешаем вложенные элементы
    onLongPress?: (event: any) => void;
};

export default function Map({ children, onLongPress }: MapProps) {
    return (
        <MapView style={styles.map}
            initialRegion={{
                latitude: 58.0105,
                longitude: 56.2502,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onLongPress={onLongPress}
        >
            {children}
        </MapView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});