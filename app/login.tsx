import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "./_layout";

export default function LoginScreen() {
  const { setIsLoggedIn } = useAuth();
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.replace("/private");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
      <Button title="Login" onPress={handleLogin} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
