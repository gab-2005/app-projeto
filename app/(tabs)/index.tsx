import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import BotaoCustomizado from '../../components/buttons';

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.text}>Bem-vindo(a) ao seu app!</Text>
      <Link href="/detalhes" asChild>
        <BotaoCustomizado title="Ir para Detalhes" onPress={()=> 'void'}/>
      </Link>
      <Link href="/login" asChild>
        <BotaoCustomizado title='Ir para o Login' onPress={()=> 'void'} />
      </Link>
      <Link href= "/cadastro" asChild>
        <BotaoCustomizado title='Ir para o cadastro' onPress={()=> 'void'}/>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 10,
  },

  text: {
  fontSize: 24, 
  marginBottom: 16,
  },
});