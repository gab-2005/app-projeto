import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import BotaoCustomizado from '../../components/buttons';
import BottomNav from '../../components/BottomNav';
import HeaderPerfil from '../../components/HeaderPerfil';

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header com saudação e avatar */}
      <HeaderPerfil />

      {/* Conteúdo principal rolável */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Bem-vindo(a) ao seu app!</Text>
        <Text style={styles.subtitle}>
          Aqui você poderá explorar o mapa da faculdade e navegar pelas salas.
        </Text>

        <View style={styles.buttonsWrapper}>
          <Link href="/detalhes" asChild>
            <BotaoCustomizado title="Ir para Detalhes" />
          </Link>

          <Link href="/login" asChild>
            <BotaoCustomizado title="Ir para o Login" />
          </Link>

          <Link href="/cadastro" asChild>
            <BotaoCustomizado title="Ir para o Cadastro" />
          </Link>

          <Link href="/home" asChild>
            <BotaoCustomizado title="Ir para a Home" />
          </Link>
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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
