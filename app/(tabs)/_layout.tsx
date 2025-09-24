// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { AppThemeProvider } from "../../components/ThemeContext";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="perfil" options={{ headerShown: false }} />
        <Stack.Screen name="detalhes" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </AppThemeProvider>
  );
}
