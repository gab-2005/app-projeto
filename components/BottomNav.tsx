import { Ionicons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppColors } from '../constants/theme';

// Interface para tipagem das abas
interface TabItem {
  name: string;
  icon: string;
  route: '/' | '/mapa' | '/perfil';
}

// Constantes para altura consistente
const BOTTOM_NAV_HEIGHT = 70;
const TAB_ICON_SIZE = 24;
const TAB_LABEL_SIZE = 12;

/**
 * Componente de navegação inferior simples e robusto
 * 
 * Características:
 * - Altura fixa e consistente
 * - Safe Area automática
 * - Design limpo e funcional
 * - Sem bugs de reinicialização
 */
export default function BottomNav() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  
  // Configuração das abas
  const tabs: TabItem[] = [
    { name: 'Home', icon: 'home-outline', route: '/' },
    { name: 'Mapa', icon: 'map-outline', route: '/mapa' },
    { name: 'Perfil', icon: 'person-outline', route: '/perfil' },
  ];

  // Padding fixo e estável - sem mudanças dinâmicas
  const bottomPadding = Platform.select({
    ios: Math.max(insets.bottom, 8), // iOS: Safe Area ou mínimo 8px
    android: Math.max(insets.bottom, 12), // Android: Safe Area ou mínimo 12px
    default: 12,
  });

  return (
    <View style={[
      styles.container,
      { 
        paddingBottom: bottomPadding,
        // Altura total = altura base + padding
        height: BOTTOM_NAV_HEIGHT + bottomPadding,
      }
    ]}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <Link key={tab.route} href={tab.route} asChild>
            <TouchableOpacity 
              style={styles.tab} 
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Navegar para ${tab.name}`}
              accessibilityState={{ selected: isActive }}
            >
              <Ionicons
                name={(isActive ? tab.icon.replace('-outline', '') : tab.icon) as any}
                size={TAB_ICON_SIZE}
                color={isActive ? AppColors.tabActive : AppColors.tabInactive}
              />
              <Text style={[
                styles.label, 
                isActive && styles.activeLabel
              ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: AppColors.backgroundCard,
    paddingTop: 8,
    // Z-index alto para garantir que fique sobre outros elementos
    zIndex: 9999,
    // Altura fixa para estabilidade total
    height: BOTTOM_NAV_HEIGHT,
    // Sombra/elevation estável
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 44,
  },
  label: {
    color: AppColors.tabInactive,
    fontSize: TAB_LABEL_SIZE,
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeLabel: {
    color: AppColors.tabActive,
    fontWeight: '600',
  },
});
