import { registerRootComponent } from "expo";
import { PaperProvider } from "react-native-paper";
import App from "./App";
import GlobalContextProvider from "./utils/GlobalContext";

function Main() {
  return (
    <PaperProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </PaperProvider>
  );
}

registerRootComponent(Main);
