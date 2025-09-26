import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNav from '../../components/BottomNav';
import { useAppTheme } from '../../components/ThemeContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAvatar } from '../../hooks/useAvatar';

export default function TelaPerfil() {
  const [email] = useState("usuario@email.com");
  const { isDark, toggleTheme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { avatar, pickImage } = useAvatar();

  const OptionItem = ({ icon, label, color = "#fff", rightElement, onPress }) => {
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
      if (onPress) onPress();
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }], width: '100%' }}>
        <TouchableOpacity
          style={styles.optionRow}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Ionicons name={icon} size={22} color={color} style={{ marginRight: 10 }} />
            <Text style={[styles.optionText, { color }]}>{label}</Text>
          </View>
          {rightElement && rightElement}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => console.log("Usuário saiu") },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <LinearGradient
        colors={isDark ? ['#141414', '#2c2c2c'] : ['#7e57c2', '#0097a7']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >

        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
              <LinearGradient colors={['#fff', '#bbb']} style={styles.avatarBorder}>
                <Image source={avatar} style={styles.avatar} />
              </LinearGradient>
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.email}>{email}</Text>

          {/* Opções */}
          <OptionItem
            icon="moon"
            label="Modo Escuro"
            rightElement={<Switch value={isDark} onValueChange={toggleTheme} />}
          />
          <OptionItem icon="person-circle-outline" label="Informações Pessoais" />
          <OptionItem icon="eye-outline" label="Acessibilidade" />
          <OptionItem icon="settings-outline" label="Configurações" />
          <OptionItem
            icon="log-out-outline"
            label="Sair da Conta"
            color="red"
            onPress={handleLogout}
          />

        </ScrollView>

        <BottomNav />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  avatarWrapper: {
    marginBottom: 15,
  },
  avatarBorder: {
    padding: 3,
    borderRadius: 55,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0008',
    borderRadius: 20,
    padding: 5,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 25,
    fontWeight: '500',
  },
  optionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
  },
});
