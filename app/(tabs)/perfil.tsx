import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from '../../components/BottomNav';
import { useAppTheme } from '../../components/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TelaPerfil() {
  const [email] = useState("usuario@email.com"); 
  const [avatar, setAvatar] = useState(require("../../assets/images/perfil.png")); 
  const { isDark, toggleTheme } = useAppTheme(); 
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const savedAvatar = await AsyncStorage.getItem('@avatar_uri');
        if (savedAvatar) setAvatar({ uri: savedAvatar });
      } catch (e) {
        console.log("Erro ao carregar avatar:", e);
      }
    };
    loadAvatar();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setAvatar({ uri });
      await AsyncStorage.setItem('@avatar_uri', uri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <LinearGradient
        colors={isDark ? ['#222', '#555'] : ['#9560e1', '#005c83']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={avatar} style={styles.avatar} />
          </TouchableOpacity>

          <Text style={styles.email}>{email}</Text>

          <View style={styles.optionRow}>
            <Text style={styles.optionText}>Modo Escuro</Text>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Informações Pessoais</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Acessibilidade</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Configuração</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: 'red' }]}>Sair da Conta</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  optionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
});
