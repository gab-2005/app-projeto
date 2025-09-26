
import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import BotaoCustomizado from '../components/buttons';
import BottomNav from '../components/BottomNav';
import HeaderPerfil from '../components/HeaderPerfil';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


export default function TelaInicial() {
  const insets = useSafeAreaInsets(); // Para lidar com notch/barra de gesto


  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Header fixo */}
      <HeaderPerfil />

      {/* Conteúdo rolável */}
      <ScrollView>

      </ScrollView>

      {/* BottomNav fixo no final */}
      <View style={{ paddingBottom: insets.bottom }}>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    
  },
});