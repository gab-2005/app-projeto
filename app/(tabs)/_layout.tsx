import { Stack } from 'expo-router';
import React from 'react';

// Este é o layout raiz da sua aplicação
// Ele define que todas as telas dentro de 'app' serão parte de uma navegação em pilha
export default function RootLayout() {
  return (
    <Stack>
      {/* Cada tela é configurada aqui. O Expo Router encontra os arquivos automaticamente */}
      <Stack.Screen 
      name="index" 
      options={{ 
        title: 'Tela Inicial' 
      }} />

      <Stack.Screen 
      name="detalhes" 
      options={{ 
        title: 'Página de Detalhes' 
      }} />

      <Stack.Screen 
      name= "cadastro"
      options = {{
        title: 'Página de Cadastro'
      }} />

      <Stack.Screen 
      name= "login"
      options = {{
        title: 'Página de Login'
      }} />

    </Stack>

 
  );
}