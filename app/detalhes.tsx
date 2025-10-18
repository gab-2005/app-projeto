import BotaoCustomizado from '@/components/buttons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeaderPerfil from '../components/HeaderPerfil';
import { AppColors } from '../constants/theme';

export default function TelaDetalhes() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <HeaderPerfil title="Detalhes" />
      <View style={styles.container}>
        <Text style={styles.text}>Tela de Detalhes</Text>
        <BotaoCustomizado title="Voltar" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
  },
  text: { 
    fontSize: 24, 
    marginBottom: 16,
    textAlign: 'center',
    color: AppColors.textPrimary,
  },
});