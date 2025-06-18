import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

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
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const generateNewCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setIsCaptchaVerified(false);
    setUserCaptcha("");
    setUsername("");
    setPassword("");
  };

  const verifyCaptcha = () => {
    if (userCaptcha.toLowerCase() === captchaText.toLowerCase()) {
      setIsCaptchaVerified(true);
      Alert.alert("Captcha Verified", "You can now proceed with login", [{ text: "OK", style: "default" }]);
    } else {
      Alert.alert("Invalid Captcha", "Please try again!", [
        {
          text: "OK",
          style: "default",
          onPress: generateNewCaptcha,
        },
      ]);
      setUserCaptcha("");
    }
  };

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
    if (!isCaptchaVerified) {
      Alert.alert("Captcha Required", "Please verify the captcha first!", [{ text: "OK", style: "default" }]);
      return;
    }

    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        setIsLoggedIn(true);
        checkOnboardingStatus();
      })
      .catch((error) => {
        Alert.alert("Login Error", error.message, [
          {
            text: "OK",
            style: "default",
          },
        ]);
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
          <View style={styles.captchaContainer}>
            <ThemedText style={styles.captchaText}>{captchaText}</ThemedText>
            <TouchableOpacity style={styles.refreshButton} onPress={generateNewCaptcha}>
              <ThemedText style={styles.buttonText}>↻ New Captcha</ThemedText>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter Captcha"
            value={userCaptcha}
            onChangeText={setUserCaptcha}
            placeholderTextColor={colorScheme === "dark" ? "#D4A373" : "#D4A373"}
          />
          <TouchableOpacity style={[styles.customButton, { backgroundColor: "#D4A373" }]} onPress={verifyCaptcha}>
            <ThemedText style={styles.buttonText}>Verify Captcha</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.customButton, { opacity: isCaptchaVerified ? 1 : 0.5 }]}
            onPress={handleLogin}
          >
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
    backgroundColor: "#FFF5E6",
  },
  captchaContainer: {
    width: "100%",
    backgroundColor: "#4A4238",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  captchaText: {
    fontSize: 24,
    fontFamily: "monospace",
    letterSpacing: 8,
    color: "#FFF5E6",
    fontStyle: "italic",
    textDecorationLine: "line-through",
    transform: [{ rotate: "5deg" }],
  },
  refreshButton: {
    backgroundColor: "#D4A373",
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF5E6",
  },
  tabText: {
    fontSize: 18,
    color: "#D4A373",
  },
  activeTab: {
    textDecorationLine: "underline",
    color: "#FF8C42",
  },
  formContainer: {
    width: "80%",
    gap: 15,
    backgroundColor: "rgba(212, 163, 115, 0.1)",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D4A373",
    borderRadius: 5,
    padding: 10,
    color: "#4A4238",
    backgroundColor: "#FFF5E6",
  },
  customButton: {
    backgroundColor: "#FF8C42",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF5E6",
    fontSize: 16,
    fontWeight: "600",
  },
});
