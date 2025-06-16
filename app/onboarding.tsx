import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import { SlideItem } from "@/components/SlideItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to BadUX",
    description: "Experience a unique and innovative way to interact with your app",
    image: "🎉",
  },
  {
    id: "2",
    title: "Easy Navigation",
    description: "Discover intuitive gestures and seamless transitions",
    image: "🚀",
  },
  {
    id: "3",
    title: "Let's Get Started",
    description: "Your journey begins now",
    image: "✨",
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(slides.map((slide) => ({ key: slide.id, title: "" })));

  const renderScene = SceneMap({
    "1": () => <SlideItem {...slides[0]} />,
    "2": () => <SlideItem {...slides[1]} />,
    "3": () => <SlideItem {...slides[2]} />,
  });

  const scrollToNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleFinish = async () => {
    try {
      await AsyncStorage.setItem("@onboarding_complete", "true");
      router.replace("/private");
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  const renderTabBar = () => null;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.slideContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width }}
          renderTabBar={renderTabBar}
          swipeEnabled={true}
        />
      </View>

      <View style={styles.navigation}>
        <View style={styles.pagination}>
          {slides.map((_, i) => {
            if (i === index) {
              return <View style={[styles.dot, { width: 20, opacity: 1 }]} key={i.toString()} />;
            } else {
              return <View style={[styles.dot, { width: 10, opacity: 0.3 }]} key={i.toString()} />;
            }
          })}
        </View>
        {index === slides.length - 1 ? (
          <TouchableOpacity style={styles.button} onPress={handleFinish}>
            <ThemedText style={styles.buttonText}>Finish</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={scrollToNext}>
            <ThemedText style={styles.buttonText}>Next</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideContainer: {
    flex: 3,
    width: width,
  },
  navigation: {
    marginBottom: 20,
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    height: 40,
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0a7ea4",
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: "#0a7ea4",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
