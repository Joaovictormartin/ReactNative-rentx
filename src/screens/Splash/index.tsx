import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import BrandSvg from "../../assets/svg/brand.svg";
import LogoSvg from "../../assets/svg/logo.svg";

import { Container } from "./styles";

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const { navigate } = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [1, .3, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.5, 1]),
      transform: [{
        translateX: interpolate(
          splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
      }]
    };
  });

  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      {duration: 1500},
      () => {
        'worklet'
        runOnJS(startApp)()
      }
    );
  }, []);

  function startApp() {
    navigate("Home")
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[ logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}