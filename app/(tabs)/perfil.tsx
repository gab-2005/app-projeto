import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import { useAppTheme } from '../../components/ThemeContext';
import { AppColors } from '../../constants/theme';
import { useAvatar } from '../../hooks/useAvatar';

const { width } = Dimensions.get('window');

export default function TelaPerfil() {
  const [userData, setUserData] = useState({
    email: "usuario@email.com",
    name: "João Silva Santos",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP"
  });
  const { isDark, toggleTheme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { avatar, pickImage } = useAvatar();
  
  // Estados essenciais para funcionalidades reais
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Função para carregar dados do usuário
  const loadUserData = useCallback(async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      const userName = await AsyncStorage.getItem('userName');
      const userPhone = await AsyncStorage.getItem('userPhone');
      const userAddress = await AsyncStorage.getItem('userAddress');
      
      if (userEmail) {
        setUserData({
          email: userEmail,
          name: userName || "Usuário",
          phone: userPhone || "(11) 99999-9999",
          address: userAddress || "Endereço não informado"
        });
      }
    } catch (error) {
      console.log('Erro ao carregar dados do usuário:', error);
    }
  }, []);

  // Carregar dados do usuário do AsyncStorage
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Recarregar dados sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );

  // Animações de entrada
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Função para feedback háptico
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (Platform.OS !== 'web') {
      const duration = type === 'light' ? 50 : type === 'medium' ? 100 : 200;
      Vibration.vibrate(duration);
    }
  };

  const OptionItem = ({ icon, label, color = "#fff", rightElement, onPress, subtitle }: {
    icon: string;
    label: string;
    color?: string;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    subtitle?: string;
  }) => {
    const itemScaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
      triggerHaptic('light');
      Animated.spring(itemScaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(itemScaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
      if (onPress) {
        triggerHaptic('medium');
        onPress();
      }
    };

    return (
      <Animated.View style={{ 
        transform: [{ scale: itemScaleAnim }, { translateY: slideAnim }], 
        width: '100%',
        opacity: fadeAnim,
      }}>
        <TouchableOpacity
          style={styles.optionRow}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <View style={styles.optionLeft}>
            <Ionicons name={icon as any} size={22} color={color} style={{ marginRight: 10 }} />
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionText, { color }]}>{label}</Text>
              {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          {rightElement && rightElement}
        </TouchableOpacity>
      </Animated.View>
    );
  };


  // Componente de Informações Pessoais
  const PersonalInfoSection = () => (
    <Animated.View style={[styles.sectionCard, { opacity: fadeAnim }]}>
      <Text style={styles.sectionTitle}>Informações Pessoais</Text>
      
      <OptionItem
        icon="person-outline"
        label="Nome Completo"
        subtitle={userData.name}
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
      
      <OptionItem
        icon="mail-outline"
        label="E-mail"
        subtitle={userData.email}
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
      
      <OptionItem
        icon="call-outline"
        label="Telefone"
        subtitle={userData.phone}
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
      
      <OptionItem
        icon="location-outline"
        label="Endereço"
        subtitle={userData.address}
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
    </Animated.View>
  );



  const handleLogout = async () => {
    triggerHaptic('heavy');
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive", 
          onPress: async () => {
            try {
              // Limpar dados de login do AsyncStorage
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userEmail');
              console.log("Usuário saiu - dados limpos");
              
              // Redirecionar para a página inicial
              // O useFocusEffect na página inicial vai detectar a mudança
            } catch (error) {
              console.log("Erro ao fazer logout:", error);
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Container principal com Safe Area */}
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        {/* Header removido */}

        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
                <LinearGradient colors={[AppColors.backgroundCard, AppColors.border]} style={styles.avatarBorder}>
                  <Image source={avatar} style={styles.avatar} />
                </LinearGradient>
                <View style={styles.cameraIcon}>
                  <Ionicons name="camera" size={18} color={AppColors.textWhite} />
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.email}>{userData.email}</Text>


            {/* Informações Pessoais */}
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
                    <Ionicons name="person" size={22} color="#fff" />
                    <Text style={styles.menuItemText}>Informações Pessoais</Text>
                  </View>
                  <Ionicons 
                    name={showPersonalInfo ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#fff" 
                  />
                </TouchableOpacity>
                {showPersonalInfo && <PersonalInfoSection />}
              </View>

              {/* Conta */}
              <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Conta</Text>
                
                <TouchableOpacity 
                  style={[styles.menuItem, styles.logoutMenuItem]}
                  onPress={handleLogout}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons name="log-out" size={22} color="#FF4444" />
                    <Text style={[styles.menuItemText, styles.logoutText]}>Sair da Conta</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#FF4444" />
                </TouchableOpacity>
              </View>

            </View>
            

          </ScrollView>
        </View>
      </View>

      {/* BottomNav fixo no final - fora do container principal */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.primary,
  },
  safeArea: {
    flex: 1,
  },
  container: { 
    flex: 1,
    backgroundColor: AppColors.primary,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  avatarWrapper: {
    marginBottom: 15,
  },
  avatarBorder: {
    padding: 3,
    borderRadius: 55,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0008',
    borderRadius: 20,
    padding: 5,
  },
  email: {
    fontSize: 16,
    color: AppColors.textWhite,
    marginBottom: 25,
    fontWeight: '500',
  },
  optionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    minHeight: 56,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: AppColors.textWhite,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  statsCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.textWhite,
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.textWhite,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  // Layout refatorado - mais limpo e organizado
  menuContainer: {
    width: '100%',
    marginBottom: 20,
  },
  menuSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.textWhite,
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 56,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: AppColors.textWhite,
    marginLeft: 12,
    fontWeight: '500',
  },
  sectionCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoutMenuItem: {
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
  },
  logoutText: {
    color: '#FF4444',
    fontWeight: '600',
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 8,
    width: 90,
    justifyContent: 'space-between',
  },
  fontSizeText: {
    fontSize: 14,
    color: AppColors.textWhite,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  switchWrapper: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});