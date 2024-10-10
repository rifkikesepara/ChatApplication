import { ImageBackground, StyleSheet, View } from "react-native";
import { Login, Test } from "./pages";
import { ActivityIndicator } from "react-native-paper";
import useGlobal from "./utils/useGlobal";

export default function App() {
  const gContext = useGlobal();

  return (
    <View style={styles.container}>
      {gContext.loadingScreen && (
        <View
          style={{
            position: "absolute",
            zIndex: 200,
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      )}
      <Test />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
