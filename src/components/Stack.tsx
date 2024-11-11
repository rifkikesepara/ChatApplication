import { View } from "react-native";
import { StackProps } from "./Types";

const Stack = ({
  children,
  width = "100%",
  height,
  style,
  direction = "row",
  alignItems = "flex-start",
  justifyContent = "flex-start",
  spacing = 0,
}: StackProps) => {
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: direction,
          alignItems: alignItems,
          justifyContent: justifyContent,
          gap: spacing,
          width: width,
          height: height,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Stack;
