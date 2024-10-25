import React from "react";
import { DimensionValue, KeyboardTypeOptions } from "react-native";
import { TextInputProps } from "react-native-paper";

interface StackProps {
  children: React.JSX.Element;
  direction?: "row" | "column";
  width?: DimensionValue;
  justifyContent?:
    | "center"
    | "flex-end"
    | "flex-start"
    | "space-between"
    | "space-around";
  alignItems?: "center" | "flex-end" | "flex-start";
  spacing?: number;
  style?: CSSStyleDeclaration | {};
}

interface TextFieldProps extends TextInputProps {
  placeholder: string;
  label: string;
  value?: string;
  error?: boolean;
  mode?: "flat" | "outlined";
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export { StackProps, TextFieldProps };
