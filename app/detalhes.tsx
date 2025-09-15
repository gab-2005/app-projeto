import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 
import React from 'react';
import BotaoCustomizado from '@/components/buttons';
export default function TelaDetalhes() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Detalhes</Text>
      <BotaoCustomizado title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24, marginBottom: 16 },
});