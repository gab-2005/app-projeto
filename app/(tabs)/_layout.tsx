import React, { useState } from "react";
import { Stack } from "expo-router";
import { Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function RootLayout() {
  const [image, setImage] = useState<string | null>(null);

  // Função para abrir a galeria
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Componente para o avatar no header
  const renderHeaderRight = () => (
    <TouchableOpacity style={{ marginRight: 0 }} onPress={pickImage}>
      <Image
        source={
          image
            ? { uri: image }
            : require("../../assets/images/perfil.png") // imagem padrão local
        }
        style={{
          width: 40,
          height: 40,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "#fff",
        }}
      />
    </TouchableOpacity>
  );

  return (
    <Stack>
      {/* Tela inicial */}
      <Stack.Screen
        name="index"
        options={{
          title: "Olá Coruja",
          headerRight: renderHeaderRight,
        }}
      />

      <Stack.Screen
        name="detalhes"
        options={{
          title: "Página de Detalhes",
          headerRight: renderHeaderRight,
        }}
      />

      <Stack.Screen
        name="cadastro"
        options={{
          title: "Página de Cadastro",
          headerRight: renderHeaderRight,
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          title: "Página de Login",
          headerRight: renderHeaderRight,
        }}
      />

      <Stack.Screen
        name="home"
        options={{
          title: "Futuro Home",
          headerRight: renderHeaderRight,
        }}
      />

      <Stack.Screen
        name="chat"
        options={{
          title: "Chat",
          headerRight: renderHeaderRight,
        }}
      />

      <Stack.Screen
        name="perfil"
        options={{
          title: "Perfil",
          headerRight: renderHeaderRight,
        }}
      />
    </Stack>
  );
}
