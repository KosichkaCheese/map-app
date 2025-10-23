import { useDatabase } from '@/contexts/databaseContext';
import { addMarker } from '@/database/operations';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import Map from "../components/Map";
import Markers from "../components/Markers";
import { Marker } from "../types";

export default function Index() {
  const { getMarkers, isLoading, error } = useDatabase();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isLoadingMarkers, setIsLoadingMarkers] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!isLoading) {
        setIsLoadingMarkers(true);
        loadMarkers();
        setIsLoadingMarkers(false);
      }
    }, [isLoading]));

  const loadMarkers = async () => {
    setIsLoadingMarkers(true);
    await getMarkers().then(setMarkers);
    setIsLoadingMarkers(false);
  };

  const onLongMapPress = async (event: any) => {
    const newMarker: Marker = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };

    try {
      await addMarker(newMarker);
      await loadMarkers();
    } catch (error) {
      console.error('Ошибка при добавлении маркера:', error);
      Alert.alert('Ошибка', 'Ошибка при добавлении маркера', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <Map onLongPress={onLongMapPress}>
        <Markers markers={markers} />
      </Map>
      {(isLoading || isLoadingMarkers) && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text>Загрузка...</Text>
        </View>
      )}
      {error && (
        <View style={styles.loading}>
          <Text>Произошла ошибка: {error.message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B86C51',
    paddingBottom: 47,
  },
  loading: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
