import { Stack } from "../../components";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import TickAnimation from "./TickAnimation";
import * as Haptics from "expo-haptics";
import { Text } from "react-native-paper";
import { Image } from "expo-image";

const Home = () => {
  const slideDirection = useSharedValue(null);
  const pressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    // backgroundColor: pressed.value ? "#FFE04B" : "#B58DF1",
    transform: [
      { translateX: offsetX.value * 1.6 },
      { translateY: offsetY.value },
      { rotateZ: (offsetX.value / 20).toString() + "deg" },
      { scale: scale.value },
    ],
  }));

  const vibrate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const slide = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
    })
    .onFinalize(() => {
      if (slideDirection.value) {
        switch (slideDirection.value) {
          case "right":
            offsetX.value = withTiming(280, null, (finished) => {
              if (finished) {
                scale.value = 0;
                offsetY.value = 0;
                offsetX.value = withTiming(0, { duration: 500 });
                scale.value = withDelay(300, withTiming(1, { duration: 500 }));
              }
            });
            break;
          case "left":
            offsetX.value = withTiming(-280, null, (finished) => {
              if (finished) {
                scale.value = 0;
                offsetY.value = 0;
                offsetX.value = withTiming(0, { duration: 500 });
                scale.value = withDelay(300, withTiming(1, { duration: 500 }));
              }
            });
            break;
        }
      } else {
        offsetX.value = withTiming(0);
        offsetY.value = withSpring(0);
      }
      pressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        interpolate(offsetX.value, [-100, 100], [-1, 1]),
        [-1, 0, 1],
        ["red", "white", "green"]
      ),
    };
  });

  return (
    <Stack
      height="100%"
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Animated.View
        style={[
          {
            width: "100%",
            height: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          animatedStyle,
        ]}
      >
        <GestureDetector gesture={slide}>
          <Animated.View
            style={[
              {
                width: "90%",
                height: 700,
                backgroundColor: "violet",
              },
              animatedStyles,
            ]}
          >
            <Stack
              height="100%"
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={20}
                height="100%"
              >
                <Image
                  style={{
                    position: "absolute",
                    top: 80,
                    width: 200,
                    height: 200,
                  }}
                  source="https://dummyimage.com/600x400/000/fff&text=test"
                />
                <Text variant="headlineLarge">Test Data</Text>
              </Stack>
              <TickAnimation
                fillAmount={offsetX}
                thresholdX={0.2}
                onCompleteOnce={(direciton) => vibrate()}
                onThreshold={(threshold) => {
                  if (threshold.left) slideDirection.value = "left";
                  else if (threshold.right) slideDirection.value = "right";
                  else slideDirection.value = null;
                }}
              />
            </Stack>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </Stack>
  );
};

export default Home;
