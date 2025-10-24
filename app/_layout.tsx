import { DatabaseProvider } from "@/contexts/databaseContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#B86C51',
          },
          headerTintColor: '#DCA998',
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="marker/[id]" options={{ title: 'Marker' }} />
      </Stack>
    </DatabaseProvider>
  )
}
