import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import HeaderPerfil from '../../components/HeaderPerfil';
import { useAppTheme } from '../../components/ThemeContext';
import { AppColors } from '../../constants/theme';
import { useAvatar } from '../../hooks/useAvatar';

export default function TelaPerfil() {
  const [email] = useState("usuario@email.com");
  const { isDark, toggleTheme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { avatar, pickImage } = useAvatar();

  const OptionItem = ({ icon, label, color = "#fff", rightElement, onPress }: {
    icon: string;
    label: string;
    color?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
  }) => {
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
            <Ionicons name={icon as any} size={22} color={color} style={{ marginRight: 10 }} />
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
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Container principal com Safe Area */}
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        {/* Header fixo */}
        <HeaderPerfil title="Perfil" showAvatar={false} />

        <LinearGradient
          colors={isDark ? [AppColors.backgroundDark, '#2c2c2c'] : [AppColors.primary, AppColors.secondary]}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                <LinearGradient colors={[AppColors.backgroundCard, AppColors.border]} style={styles.avatarBorder}>
                  <Image source={avatar} style={styles.avatar} />
                </LinearGradient>
                <View style={styles.cameraIcon}>
                  <Ionicons name="camera" size={18} color={AppColors.textWhite} />
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.email}>{email}</Text>

            {/* Opções */}
            <OptionItem
              icon="moon"
              label="Modo Escuro"
              rightElement={<Switch value={isDark} onValueChange={toggleTheme} />}
              onPress={() => {}}
            />
            <OptionItem 
              icon="person-circle-outline" 
              label="Informações Pessoais" 
              rightElement={null}
              onPress={() => {}}
            />
            <OptionItem 
              icon="eye-outline" 
              label="Acessibilidade" 
              rightElement={null}
              onPress={() => {}}
            />
            <OptionItem 
              icon="settings-outline" 
              label="Configurações" 
              rightElement={null}
              onPress={() => {}}
            />
            <OptionItem
              icon="log-out-outline"
              label="Sair da Conta"
              color="red"
              rightElement={null}
              onPress={handleLogout}
            />

          </ScrollView>
        </LinearGradient>
      </View>

      {/* BottomNav fixo no final - fora do container principal */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  safeArea: {
    flex: 1,
  },
  container: { flex: 1 },
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
    color: AppColors.textWhite,
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
    color: AppColors.textWhite,
  },
});
