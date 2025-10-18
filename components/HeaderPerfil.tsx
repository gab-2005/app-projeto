import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../constants/theme";
import { useAvatar } from "../hooks/useAvatar";

interface HeaderPerfilProps {
  saudacao?: string;
  showAvatar?: boolean;
  title?: string;
}

export default function HeaderPerfil({ 
  saudacao = "Olá Coruja", 
  showAvatar = true, 
  title 
}: HeaderPerfilProps) {
  const { avatar, pickImage } = useAvatar();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.saudacao}>{title || saudacao}</Text>
      </View>
      {showAvatar && (
        <TouchableOpacity onPress={pickImage}>
          <Image source={avatar} style={styles.avatar} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: AppColors.backgroundCard,
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  leftSection: {
    flex: 1,
  },
  saudacao: {
    fontSize: 20,
    fontWeight: "600",
    color: AppColors.textPrimary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: AppColors.border,
  },
});
