import { Register } from "@/lib/authentication";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await Register(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput value={email} placeholder={"email"} onChangeText={setEmail} />
      <TextInput
        value={password}
        placeholder={"password"}
        onChangeText={setPassword}
      />
      <Button title={"Register"} onPress={handleRegister} />
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
