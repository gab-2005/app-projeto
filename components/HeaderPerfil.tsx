// components/HeaderPerfil.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface HeaderPerfilProps {
  saudacao?: string;
}

export default function HeaderPerfil({ saudacao = "Olá Coruja" }: HeaderPerfilProps) {
  const [image, setImage] = useState<string | null>(null);

  // Carregar imagem salva ao iniciar
  useEffect(() => {
    const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem("@perfil_image");
      if (savedImage) setImage(savedImage);
    };
    loadImage();
  }, []);

  // Função para abrir a galeria e salvar a imagem
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await AsyncStorage.setItem("@perfil_image", uri); // salva a imagem
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
              : require("../assets/images/perfil.png")
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
    elevation: 3,
    shadowColor: "#000",
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
