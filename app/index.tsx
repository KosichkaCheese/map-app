import { Stack } from "expo-router";
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Map from "../components/Map";
import Markers from "../components/Markers";
import { MarkerType } from "../types";

export default function Index() {
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const onLongMapPress = (event: any) => {
    setMarkers([
      ...markers,
      {
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <Map onLongPress={onLongMapPress}>
          <Markers markers={markers} />
        </Map>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#968CA1',
    paddingBottom: 47,
  },
});
