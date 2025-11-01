import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../../components/BottomNav';
import { useAppTheme } from '../../components/ThemeContext';
import { auth, db } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');

type UserDataState = {
  email: string | null;
  name: string;
  phone: string;
  uid: string | null;
};

export default function TelaPerfil() {
  const [userData, setUserData] = useState<UserDataState>({
    email: null,
    name: 'Usuário',
    phone: '',
    uid: null,
  });
  const [loading, setLoading] = useState(true);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (Platform.OS !== 'web') {
      const duration = type === 'light' ? 50 : type === 'medium' ? 100 : 200;
      Vibration.vibrate(duration);
    }
  };

  const handleLogout = async () => {
    triggerHaptic('heavy');
    Alert.alert('Sair da Conta', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut(auth);
            await AsyncStorage.removeItem('loggedUser');
            router.replace('/login');
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
          }
        },
      },
    ]);
  };

  const loadUser = async () => {
    try {
      const loggedUser = await AsyncStorage.getItem('loggedUser');
      if (!loggedUser) {
        router.replace('/login');
        return;
      }

      const parsedUser = JSON.parse(loggedUser);
      setUserData(prev => ({ ...prev, email: parsedUser.email, uid: parsedUser.uid }));

      if (parsedUser.uid) {
        const docRef = doc(db, 'users', parsedUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            uid: parsedUser.uid,
            email: parsedUser.email,
            name: data.firstname + ' ' + data.lastname,
            phone: data.phone || '',
          });
        }
      }
    } catch (error) {
      console.log('Erro ao carregar usuário:', error);
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  if (loading) {
    return (
      <View style={[styles.mainContainer, { backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.primary }]}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Avatar */}
          <View style={styles.avatarWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Alert.alert('Função Indisponível', 'Alterar avatar não disponível')}
            >
              <LinearGradient colors={['#EEEEEE', '#CCCCCC']} style={styles.avatarBorder}>
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person-circle-outline" size={110} color="rgba(0,0,0,0.4)" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Informações */}
          <View style={styles.infoContainer}>
            <Text style={styles.greetingText}>Bom dia,</Text>
            <Text style={styles.userNameText}>{userData.name}</Text>
            <Text style={styles.emailText}>{userData.email || 'Email não disponível'}</Text>
          </View>

          {/* Menu */}
          <View style={styles.menuContainer}>
            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Perfil</Text>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowPersonalInfo(!showPersonalInfo);
                  triggerHaptic('medium');
                }}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="person" size={22} color="#000000" />
                  <Text style={styles.optionText}>Informações Pessoais</Text>
                </View>
                <Ionicons name={showPersonalInfo ? 'chevron-up' : 'chevron-down'} size={22} color="#000000" />
              </TouchableOpacity>

              {showPersonalInfo && (
                <Animated.View style={[styles.sectionCard, { opacity: fadeAnim }]}>
                  <Text style={styles.optionText}>Nome: {userData.name}</Text>
                  <Text style={styles.optionText}>Telefone: {userData.phone || '-'}</Text>
                </Animated.View>
              )}
            </View>

            <View style={styles.menuSection}>
              <Text style={styles.sectionTitle}>Conta</Text>

              <TouchableOpacity
                style={[styles.sectionCard, styles.logoutMenuItem]}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="log-out" size={22} color="#000000" />
                  <Text style={styles.optionText}>Sair da Conta</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </View>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({

  /*** CONTAINERS PRINCIPAIS ***/
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  /*** AVATAR ***/
  avatarWrapper: {
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  avatarBorder: {
    padding: 4,
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholder: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /*** INFORMAÇÕES DO USUÁRIO ***/
  infoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
  },
  userNameText: {
    fontSize: 26,
    fontWeight: '700',
    marginTop: 4,
    color: '#000000',
  },
  emailText: {
    fontSize: 16,
    marginTop: 2,
    color: '#000000',
  },

  /*** MENU ***/
  menuContainer: {
    width: '100%',
  },
  menuSection: {
    marginBottom: 28,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginLeft: 4,
    color: '#000000',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 14,
    marginBottom: 8,
    minHeight: 60,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },

  /*** CARDS DE OPÇÃO ***/
  sectionCard: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
  },
  optionText: {
    fontSize: 16,
    marginVertical: 4,
    color: '#000000',
  },

  /*** LOGOUT ***/
  logoutMenuItem: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    borderRadius: 14,
  },

});

