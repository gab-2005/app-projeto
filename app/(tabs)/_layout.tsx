import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tela inicial */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // esconde completamente o header
        }}
      />

      <Stack.Screen
        name="detalhes"
        options={{
          headerShown: false, // header escondido, você pode colocar HeaderPerfil dentro da tela
        }}
      />

      <Stack.Screen
        name="cadastro"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="chat"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="perfil"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
