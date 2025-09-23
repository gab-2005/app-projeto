// components/HeaderPerfil.tsx
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface HeaderPerfilProps {
  saudacao?: string; // Texto à esquerda, default "Olá Coruja"
}

export default function HeaderPerfil({ saudacao = "Olá Coruja" }: HeaderPerfilProps) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.saudacao}>{saudacao}</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : require("../assets/images/perfil.png") // imagem padrão
          }
          style={styles.avatar}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 3, // sombra no Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  saudacao: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
  },
});
