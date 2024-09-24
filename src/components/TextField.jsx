import { TextInput } from "react-native-paper";
import DismissKeyboard from "./DismissKeyboard";

const TextField = ({
  placeholder,
  label,
  style,
  value,
  error,
  onChangeText = (text) => {},
}) => {
  return (
    <TextInput
      style={[
        {
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderRadius: 20,
          overflow: "hidden",
        },
        style,
      ]}
      onChangeText={onChangeText}
      placeholder={placeholder}
      label={label}
      value={value}
      error={error}
    />
  );
};

export default TextField;
