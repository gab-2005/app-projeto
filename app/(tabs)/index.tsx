import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import BotaoCustomizado from '../../components/buttons';
import BottomNav from '../../components/BottomNav';

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      
      <Text style={styles.text}>Bem-vindo(a) ao seu app!</Text>
      
      <Link href="/detalhes" asChild>
        <BotaoCustomizado title="Ir para Detalhes" onPress={() => {}} />
      </Link>

      <Link href="/login" asChild>
        <BotaoCustomizado title="Ir para o Login" onPress={() => {}} />
      </Link>

      <Link href="/cadastro" asChild>
        <BotaoCustomizado title="Ir para o cadastro" onPress={() => {}} />
      </Link>

      <Link href="/home" asChild>
        <BotaoCustomizado title="Ir para o futuro home" onPress={() => {}} />
      </Link>

      {/* Nav Bar fixa no rodapé */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 80, // espaço extra para a BottomNav
  },
  text: {
    fontSize: 24, 
    marginBottom: 16,
  },
});
