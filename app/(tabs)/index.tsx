
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import BotaoCustomizado from '../../components/buttons';
import HeaderPerfil from '../../components/HeaderPerfil';
import { AppColors } from '../../constants/theme';


export default function TelaInicial() {
  const insets = useSafeAreaInsets(); // Para lidar com notch/barra de gesto


  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header fixo */}
      <HeaderPerfil />

      {/* Conteúdo rolável */}
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bem-vindo(a) ao seu app!</Text>
        <Text style={styles.subtitle}>
          Aqui você poderá explorar o mapa da faculdade e navegar pelas salas.
        </Text>

        <View style={styles.buttonsWrapper}>
          <Link href="/detalhes" asChild>
            <BotaoCustomizado title="Ir para Detalhes" onPress={() => {}} />
          </Link>

          <Link href="/login" asChild>
            <BotaoCustomizado title="Ir para o Login" onPress={() => {}} />
          </Link>

          <Link href="/cadastro" asChild>
            <BotaoCustomizado title="Ir para o Cadastro" onPress={() => {}} />
          </Link>
        </View>
      </ScrollView>

      {/* BottomNav fixo no final */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonsWrapper: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
});
