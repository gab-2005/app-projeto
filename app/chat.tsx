import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function Chat() {
  return (
    <View style={styles.container}>
      {/* Conteúdo da Home */}
      <View style={styles.content}>
      </View>
      {/* Barra de navegação fixa */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,               // ESSENCIAL: ocupa toda a tela
    backgroundColor: '#ffffffff',
    
  },
  content: {
     backgroundColor: '#ffffffff',
    flex: 1,
    paddingBottom: 70,     // espaço reservado para a nav
  },
});
