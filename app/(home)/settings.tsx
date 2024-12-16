import { GetUser, Logout } from "@/lib/authentication";
import { View, Text, StyleSheet, Button } from "react-native";
import { router } from "expo-router";

export default function SettingsScreen() {
  const handleLogout = async () => {
    await Logout();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Text>Email:</Text>
      <Text>{GetUser()?.email}</Text>
      <Button title={"Logout"} onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
