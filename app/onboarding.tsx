import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

import { SlideItem } from "@/components/SlideItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Connect & Share",
    description: "Join a community of like-minded people and share your moments",
    image: "👥",
  },
  {
    id: "2",
    title: "Express Yourself",
    description: "Create, post, and interact with others in unique ways",
    image: "💫",
  },
  {
    id: "3",
    title: "Start Your Journey",
    description: "Your social adventure begins here",
    image: "🌟",
  },
];

export default function OnboardingScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState(slides.map((slide) => ({ key: slide.id, title: "" })));
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per slide

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (index < slides.length - 1) {
            setIndex(index + 1);
            return 10;
          } else {
            clearInterval(timer);
            handleFinish();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index]);

  const renderScene = SceneMap({
    "1": () => <SlideItem {...slides[0]} />,
    "2": () => <SlideItem {...slides[1]} />,
    "3": () => <SlideItem {...slides[2]} />,
  });

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
          swipeEnabled={false}
        />
      </View>

      <View style={styles.navigation}>
        <ThemedText style={styles.timer}>Please wait {timeLeft} seconds...</ThemedText>
        <View style={styles.pagination}>
          {slides.map((_, i) => {
            if (i === index) {
              return <View style={[styles.dot, { width: 20, opacity: 1 }]} key={i.toString()} />;
            } else {
              return <View style={[styles.dot, { width: 10, opacity: 0.3 }]} key={i.toString()} />;
            }
          })}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5E6", // light beige background
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
    backgroundColor: "#FF8C42", // warm orange to match our design system
    marginHorizontal: 8,
  },
  timer: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#4A4238", // dark warm brown for text
  },
});
