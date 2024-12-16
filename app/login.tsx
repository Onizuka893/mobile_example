import { Login } from "@/lib/authentication";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await Login(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder={"email"}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"password"}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={"Login"} onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 5,
    padding: 2,
    borderRadius: 10,
    backgroundColor: "grey",
  },
});
