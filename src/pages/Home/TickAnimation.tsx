import React, { useMemo, useState } from "react";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  interpolate,
  runOnJS,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";
import { Stack } from "../../components";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const TickAnimation = ({
  fillAmount,
  onComplete = () => {},
  onCompleteOnce = (direction) => {},
  thresholdX = 0.5,
  onThreshold = (isThreshold) => {},
}: {
  fillAmount: SharedValue<number>;
  onComplete: () => void;
  onCompleteOnce: (direction: string) => void;
  thresholdX: number;
  onThreshold: (isThreshold: { left: boolean; right: boolean }) => void;
}) => {
  const isThresholdRight = useSharedValue(false);
  const isThresholdLeft = useSharedValue(false);

  const amount = useDerivedValue(() => {
    const fillValue = Math.max(
      interpolate(fillAmount.value, [0, 200], [0, 1]),
      0
    );

    if (fillValue >= thresholdX) {
      runOnJS(onComplete)();
      if (!isThresholdRight.value) {
        runOnJS(onCompleteOnce)("right");
        isThresholdRight.value = true;
        runOnJS(onThreshold)({ right: true, left: false });
      }
    } else {
      if (isThresholdRight.value)
        runOnJS(onThreshold)({ right: false, left: false });
      isThresholdRight.value = false;
    }
    return fillValue;
  }, [fillAmount]);

  const crossAmount = useDerivedValue(() => {
    const fillValue = Math.max(
      interpolate(-fillAmount.value, [-200, 0], [-1, 0]),
      0
    );

    if (-fillValue <= -thresholdX) {
      runOnJS(onComplete)();
      if (!isThresholdLeft.value) {
        runOnJS(onCompleteOnce)("left");
        isThresholdLeft.value = true;
        runOnJS(onThreshold)({ right: false, left: true });
      }
    } else {
      if (isThresholdLeft.value)
        runOnJS(onThreshold)({ right: false, left: false });
      isThresholdLeft.value = false;
    }
    return fillValue;
  }, [fillAmount]);

  const animatedProps = useAnimatedProps(
    () => ({
      strokeDashoffset: 75 * (1 - amount.value),
    }),
    [fillAmount]
  );
  const crossAnimatedProps = useAnimatedProps(
    () => ({
      strokeDashoffset: 75 * (1 - crossAmount.value),
    }),
    [fillAmount]
  );

  return (
    <Stack justifyContent="center" style={{ position: "absolute" }}>
      <Svg width="100" height="100" viewBox="0 0 24 24">
        <AnimatedPath
          d="M2 12l5 5L22 4"
          fill="none"
          stroke="green"
          strokeWidth="2"
          strokeDasharray="75"
          animatedProps={animatedProps}
        />
        <AnimatedPath
          d="M4 4l16 16M4 20l16-16"
          fill="none"
          stroke="red"
          strokeWidth="2"
          strokeDasharray="75"
          animatedProps={crossAnimatedProps}
        />
      </Svg>
    </Stack>
  );
};

export default TickAnimation;
