import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { MapProps } from "../types";

export default function Map({ children, onLongPress }: MapProps) {
    const [loading, setLoading] = useState(true);

    return (
        <>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 58.0105,
                    longitude: 56.2502,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onLongPress={onLongPress}
                onMapReady={() => setLoading(false)}
                onMapLoaded={() => setLoading(false)}
            >
                {children}
            </MapView>
            {loading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                    <Text>Загрузка карты...</Text>
                </View>
            )}
        </>
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
    loading: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
});