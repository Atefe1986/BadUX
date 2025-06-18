import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, TouchableOpacity } from "react-native";

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
        Alert.alert(
          "Login Error",
          error.message,
          [
            {
              text: "OK",
              style: "default",
            },
          ],
          {
            tintColor: "#FF8C42", // warm orange
          }
        );
      });
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert("Signup Error", "Passwords do not match!", [
        {
          text: "OK",
          style: "default",
        },
      ]);
      return;
    }

    createUserWithEmailAndPassword(auth, username, password)
      .then(() => {
        Alert.alert("Signup Success", "Account created successfully!", [
          {
            text: "OK",
            style: "default",
          },
        ]);
        router.replace("/");
      })
      .catch((error) => {
        Alert.alert("Signup Error", "Something is wrong!", [
          {
            text: "OK",
            style: "default",
          },
        ]);
      });
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
            placeholderTextColor={colorScheme === "dark" ? "#D4A373" : "#D4A373"}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={colorScheme === "dark" ? "#D4A373" : "#D4A373"}
          />
          <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
            <ThemedText style={styles.buttonText}>Login</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colorScheme === "dark" ? "#D4A373" : "#D4A373"}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={colorScheme === "dark" ? "#D4A373" : "#D4A373"}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor={colorScheme === "dark" ? "#D4A373" : "#D4A373"}
          />
          <TouchableOpacity style={styles.customButton} onPress={handleSignup}>
            <ThemedText style={styles.buttonText}>Signup</ThemedText>
          </TouchableOpacity>
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
    backgroundColor: "#FFF5E6", // light beige background
  },
  tabContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  tabText: {
    fontSize: 18,
    color: "#D4A373", // warm beige
  },
  activeTab: {
    textDecorationLine: "underline",
    color: "#FF8C42", // warm orange
  },
  formContainer: {
    width: "80%",
    gap: 15,
    backgroundColor: "rgba(212, 163, 115, 0.1)", // subtle warm beige background
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D4A373", // warm beige
    borderRadius: 5,
    padding: 10,
    color: "#4A4238", // dark warm brown
    backgroundColor: "#FFF5E6", // light beige
  },
  customButton: {
    backgroundColor: "#FF8C42", // warm orange
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF5E6", // light beige
    fontSize: 16,
    fontWeight: "600",
  },
});
