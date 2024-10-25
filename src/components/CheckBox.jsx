import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Icon } from "react-native-paper";
import Stack from "./Stack";

const CheckBox = ({
  checked,
  value,
  onPress,
  title,
  color = "#000",
  activeColor,
}) => {
  const iconName = value ? "checkbox-marked" : "checkbox-blank";

  return (
    <Stack alignItems="center">
      <Pressable onPress={onPress}>
        {
          <Icon
            source={iconName}
            size={24}
            color={
              !value && activeColor ? color : !activeColor ? color : activeColor
            }
          />
        }
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </Stack>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
    fontWeight: "600",
  },
});
