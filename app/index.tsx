import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Pressable, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { auth } from "../firebase/firebaseConfig";
import { useAuth } from "./_layout";

export default function LoginScreen() {
  const { setIsLoggedIn } = useAuth();
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkOnboardingStatus = async () => {
    router.replace("/onboarding");
    // Uncomment the following code if you want to check onboarding status using AsyncStorage
    // try {
    //   const onboardingComplete = await AsyncStorage.getItem("@onboarding_complete");
    //   if (onboardingComplete === "true") {
    //     router.replace("/private");
    //   } else {
    //     router.replace("/onboarding");
    //   }
    // } catch (error) {
    //   console.error("Error checking onboarding status:", error);
    //   router.replace("/onboarding");
    // }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        setIsLoggedIn(true);
        checkOnboardingStatus();
      })
      .catch((error) => {
        Alert.alert("Login Error", error.message);
      });
  };

  const handleSignup = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, username, password)
        .then(() => {
          Alert.alert("Signup Success", "Account created successfully!");
          router.replace("/");
        })
        .catch((error) => {
          Alert.alert("Signup Error", "Something is wrong!");
        });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.tabContainer}>
        <Pressable onPress={() => setActiveTab("login")}>
          <ThemedText style={[styles.tabText, activeTab === "login" && styles.activeTab]}>Login</ThemedText>
        </Pressable>
        <Pressable onPress={() => setActiveTab("signup")}>
          <ThemedText style={[styles.tabText, activeTab === "signup" && styles.activeTab]}>Signup</ThemedText>
        </Pressable>
      </ThemedView>

      {activeTab === "login" ? (
        <ThemedView style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
          />
          <Button title="Login" onPress={handleLogin} />
        </ThemedView>
      ) : (
        <ThemedView style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor={colorScheme === "dark" ? "#666" : "#999"}
          />
          <Button title="Signup" onPress={handleSignup} />
        </ThemedView>
      )}
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
  tabContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  tabText: {
    fontSize: 18,
  },
  activeTab: {
    textDecorationLine: "underline",
  },
  formContainer: {
    width: "80%",
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 5,
    padding: 10,
    color: "white",
  },
});
