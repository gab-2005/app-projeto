import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../../components/BottomNav';
import HeaderPerfil from '../../components/HeaderPerfil';
import { useAppTheme } from '../../components/ThemeContext';
import { AppColors } from '../../constants/theme';
import { useAvatar } from '../../hooks/useAvatar';

const { width } = Dimensions.get('window');

export default function TelaPerfil() {
  const [email] = useState("usuario@email.com");
  const { isDark, toggleTheme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { avatar, pickImage } = useAvatar();
  
  // Estados essenciais para funcionalidades reais
  const [fontSize, setFontSize] = useState(16);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [userStats, setUserStats] = useState({
    totalSessions: 47,
    favoriteRooms: 12,
    timeSpent: '2h 34m',
    lastLogin: 'Hoje'
  });
  
  // Animações
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
    if (hapticFeedback && Platform.OS !== 'web') {
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
              <Text style={[styles.optionText, { color, fontSize }]}>{label}</Text>
              {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          {rightElement && rightElement}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Componente de estatísticas do usuário
  const UserStatsCard = () => (
    <Animated.View style={[styles.statsCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.statsTitle}>Suas Estatísticas</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.totalSessions}</Text>
          <Text style={styles.statLabel}>Sessões</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.favoriteRooms}</Text>
          <Text style={styles.statLabel}>Salas Favoritas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.timeSpent}</Text>
          <Text style={styles.statLabel}>Tempo Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userStats.lastLogin}</Text>
          <Text style={styles.statLabel}>Último Acesso</Text>
        </View>
      </View>
    </Animated.View>
  );

  // Componente de Informações Pessoais
  const PersonalInfoSection = () => (
    <Animated.View style={[styles.sectionCard, { opacity: fadeAnim }]}>
      <Text style={styles.sectionTitle}>Informações Pessoais</Text>
      
      <OptionItem
        icon="person-outline"
        label="Nome Completo"
        subtitle="João Silva Santos"
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
        subtitle={email}
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
      
      <OptionItem
        icon="school-outline"
        label="Curso"
        subtitle="Engenharia de Software"
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
      
      <OptionItem
        icon="calendar-outline"
        label="Ano de Ingresso"
        subtitle="2023"
        rightElement={
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        }
        onPress={() => triggerHaptic('medium')}
      />
    </Animated.View>
  );

  // Componente de Acessibilidade
  const AccessibilitySection = () => (
    <Animated.View style={[styles.sectionCard, { opacity: fadeAnim }]}>
      <Text style={styles.sectionTitle}>Acessibilidade</Text>
      
      <OptionItem
        icon="text-outline"
        label="Tamanho da Fonte"
        subtitle={`${fontSize}px`}
        rightElement={
          <View style={styles.fontSizeControls}>
            <TouchableOpacity 
              onPress={() => {
                setFontSize(Math.max(12, fontSize - 2));
                triggerHaptic('light');
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="remove-circle-outline" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.fontSizeText}>{fontSize}px</Text>
            <TouchableOpacity 
              onPress={() => {
                setFontSize(Math.min(24, fontSize + 2));
                triggerHaptic('light');
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        }
      />
      
      <OptionItem
        icon="phone-portrait-outline"
        label="Feedback Háptico"
        subtitle="Vibração ao tocar"
        rightElement={
          <View style={styles.switchWrapper}>
            <Switch 
              value={hapticFeedback} 
              onValueChange={setHapticFeedback}
              trackColor={{ false: '#4a4a4a', true: '#007AFF' }}
              thumbColor={hapticFeedback ? '#fff' : '#f4f3f4'}
              ios_backgroundColor="#4a4a4a"
            />
          </View>
        }
      />
      
      <OptionItem
        icon="contrast-outline"
        label="Alto Contraste"
        subtitle="Melhor visibilidade"
        rightElement={
          <View style={styles.switchWrapper}>
            <Switch 
              value={false} 
              onValueChange={() => triggerHaptic('medium')}
              trackColor={{ false: '#4a4a4a', true: '#007AFF' }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#4a4a4a"
            />
          </View>
        }
      />
      
      <OptionItem
        icon="eye-outline"
        label="Leitor de Tela"
        subtitle="Navegação por voz"
        rightElement={
          <View style={styles.switchWrapper}>
            <Switch 
              value={false} 
              onValueChange={() => triggerHaptic('medium')}
              trackColor={{ false: '#4a4a4a', true: '#007AFF' }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#4a4a4a"
            />
          </View>
        }
      />
    </Animated.View>
  );


  const handleLogout = () => {
    triggerHaptic('heavy');
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sair", style: "destructive", onPress: () => console.log("Usuário saiu") },
      ]
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Container principal com Safe Area */}
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        {/* Header fixo */}
        <HeaderPerfil title="Perfil" showAvatar={false} />

        <LinearGradient
          colors={isDark ? [AppColors.backgroundDark, '#2c2c2c'] : [AppColors.primary, AppColors.secondary]}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
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

            <Text style={[styles.email, { fontSize }]}>{email}</Text>

            {/* Estatísticas do Usuário */}
            <UserStatsCard />

            {/* Menu de Configurações */}
            <View style={styles.menuContainer}>
              {/* Configurações Básicas */}
              <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Configurações</Text>
                
                <View style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <Ionicons name="moon" size={22} color="#fff" />
                    <Text style={styles.menuItemText}>Modo Escuro</Text>
                  </View>
                  <View style={styles.switchWrapper}>
                    <Switch 
                      value={isDark} 
                      onValueChange={toggleTheme}
                      trackColor={{ false: '#4a4a4a', true: '#007AFF' }}
                      thumbColor={isDark ? '#fff' : '#f4f3f4'}
                    />
                  </View>
                </View>

                <View style={styles.menuItem}>
                  <View style={styles.menuItemLeft}>
                    <Ionicons name="notifications" size={22} color="#fff" />
                    <Text style={styles.menuItemText}>Notificações</Text>
                  </View>
                  <View style={styles.switchWrapper}>
                    <Switch 
                      value={notifications} 
                      onValueChange={setNotifications}
                      trackColor={{ false: '#4a4a4a', true: '#007AFF' }}
                      thumbColor={notifications ? '#fff' : '#f4f3f4'}
                    />
                  </View>
                </View>
              </View>

              {/* Informações Pessoais */}
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

              {/* Acessibilidade */}
              <View style={styles.menuSection}>
                <Text style={styles.sectionTitle}>Acessibilidade</Text>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    setShowAccessibility(!showAccessibility);
                    triggerHaptic('medium');
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons name="accessibility" size={22} color="#fff" />
                    <Text style={styles.menuItemText}>Configurações</Text>
                  </View>
                  <Ionicons 
                    name={showAccessibility ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#fff" 
                  />
                </TouchableOpacity>
                {showAccessibility && <AccessibilitySection />}
              </View>

            </View>
            
            {/* Botão de Sair */}
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Ionicons name="log-out" size={24} color="#ff4444" />
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </TouchableOpacity>

          </ScrollView>
        </LinearGradient>
      </View>

      {/* BottomNav fixo no final - fora do container principal */}
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  safeArea: {
    flex: 1,
  },
  container: { flex: 1 },
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 68, 68, 0.3)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4444',
    marginLeft: 8,
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