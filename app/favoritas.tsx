import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import { AppColors } from '../constants/theme';

interface Favorita {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  icone: string;
}

const favoritasMock: Favorita[] = [
  {
    id: '1',
    nome: 'Sala 101C',
    tipo: 'Sala de Aula',
    descricao: 'Sala de informática com 30 computadores',
    icone: 'desktop'
  },
  {
    id: '2',
    nome: 'Auditório',
    tipo: 'Auditório',
    descricao: 'Auditório principal com capacidade para 200 pessoas',
    icone: 'people'
  },
  {
    id: '3',
    nome: 'Biblioteca',
    tipo: 'Biblioteca',
    descricao: 'Biblioteca central com acervo completo',
    icone: 'library'
  },
  {
    id: '4',
    nome: 'Sala 105D',
    tipo: 'Laboratório',
    descricao: 'Laboratório de química',
    icone: 'flask'
  }
];

export default function FavoritasScreen() {
  const insets = useSafeAreaInsets();
  const [favoritas, setFavoritas] = useState<Favorita[]>(favoritasMock);

  const removerFavorita = (id: string) => {
    setFavoritas(favoritas.filter(fav => fav.id !== id));
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favoritas</Text>
        <Text style={styles.headerSubtitle}>Suas salas favoritas</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favoritas.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color={AppColors.textSecondary} />
            <Text style={styles.emptyTitle}>Nenhuma favorita ainda</Text>
            <Text style={styles.emptyDescription}>
              Adicione salas às suas favoritas para acesso rápido
            </Text>
          </View>
        ) : (
          <View style={styles.favoritasList}>
            {favoritas.map((favorita) => (
              <View key={favorita.id} style={styles.favoritaCard}>
                <View style={styles.favoritaInfo}>
                  <View style={styles.favoritaIcon}>
                    <Ionicons name={favorita.icone as any} size={24} color={AppColors.primary} />
                  </View>
                  <View style={styles.favoritaContent}>
                    <Text style={styles.favoritaNome}>{favorita.nome}</Text>
                    <Text style={styles.favoritaTipo}>{favorita.tipo}</Text>
                    <Text style={styles.favoritaDescricao}>{favorita.descricao}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removerFavorita(favorita.id)}
                >
                  <Ionicons name="heart" size={20} color={AppColors.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: AppColors.textSecondary,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  favoritasList: {
    gap: 12,
  },
  favoritaCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoritaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  favoritaIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  favoritaContent: {
    flex: 1,
  },
  favoritaNome: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  favoritaTipo: {
    fontSize: 12,
    color: AppColors.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  favoritaDescricao: {
    fontSize: 13,
    color: AppColors.textSecondary,
    lineHeight: 18,
  },
  removeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: AppColors.primary + '20',
  },
});
