import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { Link, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const statusBarBottom = Constants.statusBarBottom;

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Home', icon: 'home-outline', route: '/' },
    { name: 'Mapa', icon: 'map-outline', route: '/mapa' },
    { name: 'Chat', icon: 'chatbubble-ellipses-outline', route: '/chat' },
    { name: 'Perfil', icon: 'person-outline', route: '/perfil' },
  ];

  return (
    <View style={styles.container}>
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
    position: 'absolute', // mantém no rodapé
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 0,
    paddingTop: 0,
    height: 70, // define a altura exata
    marginBottom : statusBarBottom,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#727272ff',
    fontSize: 12,
    marginTop: 2,
  },
  activeLabel: {
    color: '#917AFD',
    fontWeight: 'bold',
  },
});
