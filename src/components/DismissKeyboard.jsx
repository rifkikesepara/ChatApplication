import { Keyboard } from "react-native";
import { TouchableRipple } from "react-native-paper";

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableRipple
      style={{
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 100,
      }}
      onPress={() => Keyboard.dismiss()}
    >
      {children}
    </TouchableRipple>
  );
};

export default DismissKeyboard;
