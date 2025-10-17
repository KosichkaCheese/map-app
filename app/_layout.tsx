import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#B86C51',
      },
      headerTintColor: '#DCA998',
    }}>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="marker/[id]" options={{ title: 'Marker' }} />
  </Stack>
}
