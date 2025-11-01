import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import { useSettings } from '../../hooks/useSettings';
import { auth, db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface AppIcon {
  id: string;
  name: string;
  icon: string;
  route: string;
  description: string;
}

export default function HomeScreen() {
  const { colors, vibrate, isDark } = useSettings();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const appIcons: AppIcon[] = [
    { id: 'configuracao', name: 'Personalizar', icon: 'color-palette', route: '/configuracoes', description: 'Personalizar tema\ne cores' },
    { id: 'busca', name: 'Buscar', icon: 'search', route: '/mapa', description: 'Buscar salas no mapa' },
    { id: 'sobre', name: 'Sobre', icon: 'information-circle', route: '/detalhes', description: 'Informações do app' },
  ];
  useEffect(() => {
  const checkUser = async () => {
    const storedUser = await AsyncStorage.getItem('loggedUser');

    if (storedUser) {
      // Se existir usuário armazenado
      const userData = JSON.parse(storedUser);
      setIsLoggedIn(true);

      // Buscar nome completo no Firestore
      try {
        const userRef = doc(db, 'users', userData.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const fullName = `${data.firstname || ''} ${data.lastname || ''}`.trim();
          setUserName(fullName || null);
        }
      } catch (err) {
        console.log('Erro ao buscar nome do usuário:', err);
      }
    } else {
      // Sem usuário armazenado → observa o Firebase
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setIsLoggedIn(true);
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            const fullName = `${data.firstname || ''} ${data.lastname || ''}`.trim();
            setUserName(fullName || null);
          }
        } else {
          setIsLoggedIn(false);
          setUserName(null);
        }
      });
      return () => unsubscribe();
    }
  };

  checkUser()
}, []);



  const handleUserAction = () => {
    vibrate();
    if (isLoggedIn) {
      Alert.alert('Usuário Conectado', `Bem-vindo, ${userName || 'usuário'}!`);
    } else {
      router.push('/login');
    }
  };

  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    heroTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    heroSubtitle: {
      fontSize: 14,
      color: colors.text + '80',
      textAlign: 'center',
      lineHeight: 20,
    },
    appName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 2,
    },
    appDescription: {
      fontSize: 11,
      color: colors.text + '80',
      textAlign: 'center',
      lineHeight: 14,
    },
    logoContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
    },
  });

  return (
    <View style={[dynamicStyles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
        translucent
      />

     {/* Saudação do usuário */}
{isLoggedIn && userName && (
  <Text style={{ marginLeft: 20, marginTop: 10 }}>
    <Text style={{ fontSize: 18, color: '#838383ff' }}>Bom dia,{"\n"}</Text>
    <Text style={{ fontSize: 20, fontWeight: '600', color: colors.text }}>
      {userName}
    </Text>
  </Text>
)}

      {/* Botão de usuário */}
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={styles.userButton}
          onPress={handleUserAction}
          activeOpacity={1}
        >
          <FontAwesome5
            name={isLoggedIn ? 'user-check' : 'user-times'}
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContent}>
        <View style={styles.heroSection}>
          <View style={dynamicStyles.logoContainer}>
            <Ionicons name="school" size={60} color={colors.primary} />
          </View>
          <Text style={dynamicStyles.heroTitle}>Sistema de Navegação</Text>
          <Text style={dynamicStyles.heroSubtitle}>
            Explore o mapa da faculdade e encontre facilmente qualquer sala ou ambiente
          </Text>
        </View>

        <View style={styles.appsGrid}>
          {appIcons.map((app) => (
            <Link key={app.id} href={app.route as any} asChild>
              <TouchableOpacity
                style={styles.appIcon}
                onPress={() => vibrate()}
                activeOpacity={1}
              >
                <View style={[styles.iconContainer, { backgroundColor: colors.card }]}>
                  <Ionicons name={app.icon as any} size={32} color={colors.primary} />
                </View>
                <Text style={dynamicStyles.appName}>{app.name}</Text>
                <Text style={dynamicStyles.appDescription}>{app.description}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 10,
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
  },
  userButton: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  appIcon: {
    width: (width - 80) / 3,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
