import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useAvatar } from "../hooks/useAvatar";

interface HeaderPerfilProps {
  saudacao?: string;
}

export default function HeaderPerfil({ saudacao = "Olá Coruja" }: HeaderPerfilProps) {
  const { avatar, pickImage } = useAvatar();

  return (
    <View style={styles.container}>
      <Text style={styles.saudacao}>{saudacao}</Text>
      <TouchableOpacity onPress={pickImage}>
        <Image source={avatar} style={styles.avatar} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
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
