import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(require("@/assets/images/icon.png"));

  const requestPermission = async (permissionType: "camera" | "mediaLibrary") => {
    if (permissionType === "camera") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status === "granted";
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    }
  };

  const handleImageError = () => {
    Alert.alert(
      "Permission Required",
      "Please grant permission to access your camera and photos in your device settings.",
      [{ text: "OK" }]
    );
  };

  const pickImage = async (source: "camera" | "library") => {
    try {
      const hasPermission = await requestPermission(source === "camera" ? "camera" : "mediaLibrary");

      if (!hasPermission) {
        handleImageError();
        return;
      }

      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

      if (!result.canceled) {
        setProfileImage({ uri: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const handleProfileImagePress = () => {
    Alert.alert(
      "Change Profile Photo",
      "Choose a new profile photo",
      [
        {
          text: "Take Photo",
          onPress: () => pickImage("camera"),
        },
        {
          text: "Choose from Gallery",
          onPress: () => pickImage("library"),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    router.push("/private/edit-profile");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerImageContainer}>
        <Pressable onPress={handleProfileImagePress}>
          <Image source={profileImage} style={styles.profileImage} contentFit="cover" />
          <View style={styles.editIconContainer}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </Pressable>
      </View>
      <View style={styles.profileInfo}>
        <ThemedText type="title" style={styles.name}>
          Atefeh
        </ThemedText>
        <View style={styles.bioContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <ThemedText style={styles.bioText}>Sweden</ThemedText>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>342</ThemedText>
            <ThemedText style={styles.statLabel}>Posts</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>15.3K</ThemedText>
            <ThemedText style={styles.statLabel}>Followers</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText style={styles.statNumber}>1,242</ThemedText>
            <ThemedText style={styles.statLabel}>Following</ThemedText>
          </View>
        </View>

        {/* Bio Section */}
        <ThemedText style={styles.bio}>
          🚀 UX designer | 📱 Mobile App Enthusiast{"\n"}
          Passionate about creating intuitive user experiences and exploring the latest in mobile technology.
        </ThemedText>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Pressable style={[styles.button, styles.primaryButton]} onPress={handleEditProfile}>
            <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
          </Pressable>
          <Pressable style={[styles.button, styles.secondaryButton]}>
            <Ionicons name="share-social-outline" size={20} color="#666" />
          </Pressable>
        </View>

        {/* Recent Posts Grid */}
        <View style={styles.postsSection}>
          <ThemedText style={styles.sectionTitle}>Recent Posts</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.postsGrid}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.postThumbnail}>
                <Image source={require("@/assets/images/icon.png")} style={styles.thumbnailImage} contentFit="cover" />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bioContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  bioText: {
    fontSize: 16,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  bio: {
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#4267B2",
    minWidth: 120,
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  postsSection: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  postsGrid: {
    flexDirection: "row",
  },
  postThumbnail: {
    width: 120,
    height: 120,
    marginRight: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  editIconContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#4267B2",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
