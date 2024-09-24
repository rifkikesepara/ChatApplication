import { View } from "react-native";

const Stack = ({
  children,
  style,
  direction = "row",
  alignItems = "flex-start",
  justifyContent = "flex-start",
  spacing = 0,
}) => {
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: direction,
          alignItems: alignItems,
          justifyContent: justifyContent,
          gap: spacing,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Stack;
