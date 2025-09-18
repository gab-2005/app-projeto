import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // importa hook para lidar com notch/barras de gesto

export default function BottomNav() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets(); // pega os espaços seguros do dispositivo

  const tabs = [
    { name: 'Home', icon: 'home-outline', route: '/' },
    { name: 'Chat', icon: 'chatbubble-ellipses-outline', route: '/chat' },
    { name: 'Perfil', icon: 'person-outline', route: '/perfil' },
  ];

  return (
    // Container do menu
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {tabs.map((tab) => {
        const active = pathname === tab.route;
        return (
          <Link key={tab.route} href={tab.route} asChild>
            <TouchableOpacity style={styles.tab} activeOpacity={0.7}>
              <Ionicons
                name={active ? tab.icon.replace('-outline', '') : tab.icon}
                size={24}
                color={active ? '#917AFD' : '#727272ff'}
                />
              <Text style={[styles.label, active && styles.activeLabel]}>
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
    position: 'absolute', // fixa no rodapé
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row', // coloca os itens em linha
    justifyContent: 'space-around', // espaçamento igual
    alignItems: 'center',
    backgroundColor: '#ffffffff', // fundo escuro
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    elevation: 3,
    paddingTop: 10,
    paddingBottom: 1,
    height: 70,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#727272ff', // cor padrão do texto
    fontSize: 12,
    marginTop: 2,
  },
  activeLabel: {
    color: '#917AFD', // cor do texto ativo
    fontWeight: 'bold',
  },
});