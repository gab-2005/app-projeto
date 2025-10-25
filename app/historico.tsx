import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import { AppColors } from '../constants/theme';

interface HistoricoItem {
  id: string;
  sala: string;
  tipo: string;
  data: string;
  hora: string;
  icone: string;
}

const historicoMock: HistoricoItem[] = [
  {
    id: '1',
    sala: 'Sala 101C',
    tipo: 'Sala de Aula',
    data: 'Hoje',
    hora: '14:30',
    icone: 'desktop'
  },
  {
    id: '2',
    sala: 'Auditório',
    tipo: 'Auditório',
    data: 'Ontem',
    hora: '10:15',
    icone: 'people'
  },
  {
    id: '3',
    sala: 'Biblioteca',
    tipo: 'Biblioteca',
    data: '15/12/2024',
    hora: '16:45',
    icone: 'library'
  },
  {
    id: '4',
    sala: 'Sala 105D',
    tipo: 'Laboratório',
    data: '14/12/2024',
    hora: '09:20',
    icone: 'flask'
  },
  {
    id: '5',
    sala: 'Banheiro',
    tipo: 'Banheiro',
    data: '13/12/2024',
    hora: '11:30',
    icone: 'restroom'
  }
];

export default function HistoricoScreen() {
  const insets = useSafeAreaInsets();
  const [historico, setHistorico] = useState<HistoricoItem[]>(historicoMock);

  const limparHistorico = () => {
    setHistorico([]);
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico</Text>
        <Text style={styles.headerSubtitle}>Suas navegações recentes</Text>
        {historico.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={limparHistorico}>
            <Ionicons name="trash-outline" size={16} color={AppColors.primary} />
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Conteúdo */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {historico.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color={AppColors.textSecondary} />
            <Text style={styles.emptyTitle}>Nenhum histórico</Text>
            <Text style={styles.emptyDescription}>
              Suas navegações aparecerão aqui
            </Text>
          </View>
        ) : (
          <View style={styles.historicoList}>
            {historico.map((item) => (
              <View key={item.id} style={styles.historicoCard}>
                <View style={styles.historicoInfo}>
                  <View style={styles.historicoIcon}>
                    <Ionicons name={item.icone as any} size={24} color={AppColors.primary} />
                  </View>
                  <View style={styles.historicoContent}>
                    <Text style={styles.historicoSala}>{item.sala}</Text>
                    <Text style={styles.historicoTipo}>{item.tipo}</Text>
                    <View style={styles.historicoData}>
                      <Ionicons name="calendar-outline" size={12} color={AppColors.textSecondary} />
                      <Text style={styles.historicoDataText}>{item.data}</Text>
                      <Ionicons name="time-outline" size={12} color={AppColors.textSecondary} style={styles.timeIcon} />
                      <Text style={styles.historicoDataText}>{item.hora}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.navigateButton}>
                  <Ionicons name="navigate" size={20} color={AppColors.primary} />
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
    position: 'relative',
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
  clearButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: AppColors.primary + '20',
    borderRadius: 16,
  },
  clearButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: AppColors.primary,
    marginLeft: 4,
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
  historicoList: {
    gap: 12,
  },
  historicoCard: {
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
  historicoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historicoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppColors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historicoContent: {
    flex: 1,
  },
  historicoSala: {
    fontSize: 16,
    fontWeight: '600',
    color: AppColors.textPrimary,
    marginBottom: 2,
  },
  historicoTipo: {
    fontSize: 12,
    color: AppColors.primary,
    fontWeight: '500',
    marginBottom: 6,
  },
  historicoData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historicoDataText: {
    fontSize: 12,
    color: AppColors.textSecondary,
    marginLeft: 4,
  },
  timeIcon: {
    marginLeft: 12,
  },
  navigateButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: AppColors.primary + '20',
  },
});
