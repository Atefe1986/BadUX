/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#FF8C42'; // warm orange
const tintColorDark = '#F4D03F'; // warm yellow

export const Colors = {
  light: {
    text: '#4A4238', // dark warm brown
    background: '#FFF5E6', // light beige
    tint: tintColorLight,
    icon: '#D4A373', // warm beige
    tabIconDefault: '#D4A373',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FFF5E6', // light beige
    background: '#4A4238', // dark warm brown
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
