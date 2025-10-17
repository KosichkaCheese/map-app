import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Map from "../components/Map";
import Markers from "../components/Markers";
import { markersList } from '../components/MarkersList';
import { MarkerType } from "../types";

export default function Index() {
  const [markers, setMarkers] = useState<MarkerType[]>(markersList.markers);

  const onLongMapPress = (event: any) => {
    const newList = [
      ...markers,
      {
        id: markers.length,
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
        images: [],
      },
    ];
    setMarkers(newList);
    markersList.markers = newList;
  };

  // const updateMarker = (updatedMarker: MarkerType) => {
  //   setMarkers((prev) => prev.map((marker) => (marker.id === updatedMarker.id ? updatedMarker : marker)));
  // }

  return (
    <View style={styles.container}>
      <Map onLongPress={onLongMapPress}>
        <Markers markers={markers} />
      </Map>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B86C51',
    paddingBottom: 47,
  },
});
