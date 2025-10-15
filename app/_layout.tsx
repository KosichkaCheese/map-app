import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#968CA1', // ← цвет шапки
      },
      headerTintColor: '#DCCFDD', // ← цвет текста и иконок
    }}
  />
}
