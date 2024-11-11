import { registerRootComponent } from "expo";
import { PaperProvider } from "react-native-paper";
import App from "./App";
import GlobalContextProvider from "./utils/GlobalContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Main() {
  return (
    <PaperProvider>
      <GlobalContextProvider>
        <GestureHandlerRootView>
          <App />
        </GestureHandlerRootView>
      </GlobalContextProvider>
    </PaperProvider>
  );
}

registerRootComponent(Main);
