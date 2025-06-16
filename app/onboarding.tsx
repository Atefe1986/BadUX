import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);

  const scrollToNext = () => {
    if (currentIndex < slides.length - 1 && slidesRef.current) {
      console.log("scrollToNext", currentIndex + 1);

      slidesRef.current.scrollToOffset({ offset: (currentIndex + 1) * width });
      setCurrentIndex(currentIndex + 1);
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

  return (
    <ThemedView style={styles.container}>
      <View style={styles.slideContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <SlideItem {...item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={slidesRef}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.navigation}>
        <View style={styles.pagination}>
          {slides.map((_, i) => {
            if (i === currentIndex) {
              return <Animated.View style={[styles.dot, { width: 20, opacity: 1 }]} key={i.toString()} />;
            } else {
              return <Animated.View style={[styles.dot, { width: 10, opacity: 0.3 }]} key={i.toString()} />;
            }
          })}
        </View>
        {currentIndex === slides.length - 1 ? (
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
