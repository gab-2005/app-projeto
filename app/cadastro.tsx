import { View, Text, Button, StyleSheet, StatusBar, TextInput } from 'react-native';
import { useRouter } from 'expo-router'; 
import React from 'react';
import BotaoCustomizado from '@/components/buttons';

export default function telaCadastro() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.text}>Primeiro, nos informe seu e-mail unisuam</Text>
      <TextInput placeholder='seuemail@souunisuam.com.br'  placeholderTextColor="#7a7a8bff" style = {styles.input}  accessibilityLabel='Campo de e-mail'/>
      <BotaoCustomizado title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    padding: 10,
  },

  text: {
  fontSize: 24, 
  marginBottom: 16,
  },

  input: {
    fontSize: 18,
    width: '100%',
    borderColor: '#b9b9b9ff',
    borderWidth: 1,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    color: '#242424ff',
    backgroundColor: '#FFF',
  },
});