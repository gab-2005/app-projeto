import BotaoCustomizado from '@/components/buttons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors } from '../constants/theme';

export default function telaCadastro() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={styles.container}>
        <Text style={styles.text}>Primeiro, nos informe seu e-mail unisuam</Text>
        <TextInput placeholder='seuemail@souunisuam.com.br'  placeholderTextColor={AppColors.textLight} style = {styles.input}  accessibilityLabel='Campo de e-mail'/>
        <BotaoCustomizado title="Voltar" onPress={() => router.back()} />
      </View>
    </SafeAreaView>
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
    gap: 10,
    width: '100%',
    padding: 20,
  },
  text: {
    fontSize: 24, 
    marginBottom: 16,
    textAlign: 'center',
    color: AppColors.textPrimary,
  },
  input: {
    fontSize: 18,
    width: '100%',
    borderColor: AppColors.border,
    borderWidth: 1,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    color: AppColors.textPrimary,
    backgroundColor: AppColors.backgroundCard,
  },
});