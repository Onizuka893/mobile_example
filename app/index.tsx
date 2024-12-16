import { Register } from "@/lib/authentication";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== passwordConfirm) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await Register(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <TextInput
        value={email}
        style={styles.input}
        placeholder={"email"}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder={"password"}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        value={passwordConfirm}
        placeholder={"confirm password"}
        onChangeText={setPasswordConfirm}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title={"Register"} onPress={handleRegister} />
      <Text>Already have an acount?</Text>
      <Link style={styles.link} href={"/login"}>
        Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
  },
  input: {
    height: 40,
    margin: 5,
    padding: 2,
    borderRadius: 10,
    backgroundColor: "grey",
  },
  link: {
    color: "blue",
  },
});
