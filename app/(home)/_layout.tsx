import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // Hides the header for all screens in this stack
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="createList"
        options={{
          title: "Maak een lijstje",
        }}
      />
      <Stack.Screen
        name="[user]"
        options={{
          title: "Lijst van gebruiker",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Instellingen",
        }}
      />
      <Stack.Screen
        name="camera"
        options={{
          title: "Camera",
        }}
      />
    </Stack>
  );
}
