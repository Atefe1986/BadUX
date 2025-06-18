import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function SocialFeedScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.heroSection}>
        <Image source={require("@/assets/images/icon.png")} style={styles.heroImage} contentFit="cover" />
        <ThemedText type="title" style={styles.appTitle}>
          Social Connect
        </ThemedText>
        <ThemedText style={styles.appTagline}>Where Connections Come Alive</ThemedText>
      </View>

      <ThemedText type="title" style={styles.welcomeText}>
        Welcome to Social Connect
      </ThemedText>
      <ThemedText style={styles.description}>
        Connect with friends, share moments, and discover amazing stories from around the world.
      </ThemedText>

      <ThemedView style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatar} />
            <ThemedText style={styles.username}>Atefeh</ThemedText>
          </View>
          <ThemedText style={styles.timeStamp}>2m ago</ThemedText>
        </View>

        <ThemedText style={styles.postContent}>
          Just joined Social Connect! Excited to connect with everyone here! 🎉
        </ThemedText>

        <View style={styles.interactionBar}>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="heart-outline" size={24} color="#666" />
            <ThemedText style={styles.interactionText}>Like</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#666" />
            <ThemedText style={styles.interactionText}>Comment</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="share-social-outline" size={24} color="#666" />
            <ThemedText style={styles.interactionText}>Share</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  appTagline: {
    fontSize: 18,
    opacity: 0.9,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 24,
  },
  appLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
    marginBottom: 24,
  },
  postCard: {
    width: "100%",
    backgroundColor: "#D4A373", // warm beige
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginRight: 12,
  },
  username: {
    fontWeight: "600",
    fontSize: 16,
  },
  timeStamp: {
    fontSize: 14,
    opacity: 0.6,
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  interactionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    paddingTop: 12,
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  interactionText: {
    marginLeft: 8,
    fontSize: 14,
    opacity: 0.8,
  },
});
