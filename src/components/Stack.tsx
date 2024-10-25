import { View } from "react-native";
import { StackProps } from "./Types";

const Stack = ({
  children,
  width = "100%",
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
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Stack;
