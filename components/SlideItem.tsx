import { Dimensions, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

const { width } = Dimensions.get("window");

interface SlideItemProps {
  image: string;
  title: string;
  description: string;
}

export function SlideItem({ image, title, description }: SlideItemProps) {
  return (
    <View style={[styles.slide]}>
      <ThemedText style={styles.emoji}>{image}</ThemedText>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText style={styles.description}>{description}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width: width,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emoji: {
    fontSize: 70,
    lineHeight: 80,
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 28,
    fontWeight: "600",
    color: "#FF8C42", // warm orange for title
  },
  description: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: "#4A4238", // dark warm brown for description
    lineHeight: 24,
  },
});
