import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import useCachedResources from "./frontend/hooks/useCachedResources";
import useColorScheme from "./frontend/hooks/useColorScheme";
import Navigation from "./frontend/navigation/index";
import { paperTheme, paperDarkTheme } from "./core/theme";
import { adjustColor } from "./core/adjustColor";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider
        theme={colorScheme === "dark" ? paperDarkTheme : paperTheme}
      >
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </PaperProvider>
    );
  }
}
