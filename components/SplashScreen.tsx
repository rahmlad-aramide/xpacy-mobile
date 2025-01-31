import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  useAnimatedValue,
  View,
} from "react-native";

export const SplashScreen = () => {
  const moveAnim = useAnimatedValue(300);
  const opacityAnim = useAnimatedValue(1);
  const animateBackground = useRef(new Animated.Value(0)).current;

  const interpolatedColor = animateBackground.interpolate({
    inputRange: [0, 1],
    outputRange: ["#fff", "#203645"],
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 2000,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animateBackground, {
        toValue: 1,
        duration: 500,
        delay: 2500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[styles.container, { backgroundColor: interpolatedColor }]}
      >
        <Animated.Image
          source={require("./../assets/images/logo.png")}
          style={[
            styles.image,
            { transform: [{ translateX: moveAnim }], opacity: opacityAnim },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
  },
});
