
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import { AppColors } from '../../constants/theme';

const { width } = Dimensions.get('window');

interface AppIcon {
  id: string;
  name: string;
  icon: string;
  color: string;
  route: string;
  description: string;
}

const appIcons: AppIcon[] = [
  {
    id: 'configuracao',
    name: 'Configuração',
    icon: 'settings',
    color: AppColors.primary,
    route: '/perfil',
    description: 'Configurações do app'
  },
  {
    id: 'favoritas',
    name: 'Favoritas',
    icon: 'heart',
    color: AppColors.primary,
    route: '/favoritas',
    description: 'Suas salas favoritas'
  },
  {
    id: 'busca',
    name: 'Buscar',
    icon: 'search',
    color: AppColors.primary,
    route: '/mapa',
    description: 'Buscar salas no mapa'
  },
  {
    id: 'historico',
    name: 'Histórico',
    icon: 'time',
    color: AppColors.primary,
    route: '/historico',
    description: 'Histórico de navegação'
  },
  {
    id: 'sobre',
    name: 'Sobre',
    icon: 'information-circle',
    color: AppColors.primary,
    route: '/detalhes',
    description: 'Informações do app'
  }
];

export default function TelaInicial() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Verificar status de login ao carregar a página
  const checkLoginStatus = useCallback(async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const userEmail = await AsyncStorage.getItem('userEmail');
      setIsLoggedIn(!!userToken && !!userEmail);
    } catch (error) {
      console.log('Erro ao verificar status de login:', error);
      setIsLoggedIn(false);
    }
  }, []);

  // Verificar login quando a página ganha foco (volta do login)
  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [checkLoginStatus])
  );

  // Verificar login na montagem inicial
  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleUserAction = () => {
    if (isLoggedIn) {
      // Se logado, vai para o perfil
      router.push('/perfil');
    } else {
      // Se não logado, vai para o login
      router.push('/login');
    }
  };


  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />


      {/* Botão de Usuário Inteligente */}
      <View style={styles.headerButtons}>
        <TouchableOpacity 
          style={[styles.userButton, isLoggedIn && styles.userButtonLoggedIn]}
          onPress={handleUserAction}
        >
          <Ionicons 
            name={isLoggedIn ? "person" : "person-outline"} 
            size={20} 
            color={isLoggedIn ? "#fff" : AppColors.primary} 
          />
          <View style={[styles.statusContainer, isLoggedIn ? styles.statusLoggedIn : styles.statusNotLoggedIn]}>
            <Ionicons 
              name={isLoggedIn ? "checkmark" : "close"} 
              size={10} 
              color="#fff" 
            />
          </View>
        </TouchableOpacity>
        
      </View>

      {/* Conteúdo principal */}
      <View style={styles.scrollContent}>
        {/* Hero Section com introdução */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={60} color={AppColors.primary} />
          </View>
          <Text style={styles.heroTitle}>Sistema de Navegação</Text>
          <Text style={styles.heroSubtitle}>
            Explore o mapa da faculdade e encontre facilmente qualquer sala ou ambiente
          </Text>
        </View>

        {/* Grid de ícones como home de celular */}
        <View style={styles.appsGrid}>
          {appIcons.map((app) => (
            <Link key={app.id} href={app.route as any} asChild>
              <TouchableOpacity style={styles.appIcon}>
                <View style={[styles.iconContainer, { backgroundColor: app.color }]}>
                  <Ionicons name={app.icon as any} size={32} color="#fff" />
                </View>
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={styles.appDescription}>{app.description}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

      </View>

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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80, // Espaço para os botões de login/cadastro
    paddingBottom: 20, // Espaço mínimo para o BottomNav
  },
  
  // Header Buttons
  headerButtons: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  userButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  userButtonLoggedIn: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  statusContainer: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  statusLoggedIn: {
    backgroundColor: '#4CAF50',
  },
  statusNotLoggedIn: {
    backgroundColor: '#F44336',
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: AppColors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: AppColors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  // Apps Grid - Layout como home de celular
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  appIcon: {
    width: (width - 80) / 3, // 3 colunas com espaçamento
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  appName: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
  },
  appDescription: {
    fontSize: 11,
    color: AppColors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },

});
