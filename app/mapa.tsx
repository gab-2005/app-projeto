import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav from '../components/BottomNav';
import MapMarker from '../components/MapMarker';
import SearchBar from '../components/SearchBar';

const { width, height } = Dimensions.get('window');

interface Sala {
  nome: string;
  x: number;
  y: number;
}

// Dados das salas do primeiro andar - Coordenadas enquadradas na imagem
const salas: Sala[] = [
  // Salas C (101c a 105c) - Linha superior centralizada
  { nome: "Sala 101C", x: 0.120, y: 0.415 },
  { nome: "Sala 102C", x: 0.180, y: 0.415 },
  { nome: "Sala 103C", x: 0.235, y: 0.415},
  { nome: "Sala 104C", x: 0.290, y: 0.415},
  { nome: "Sala 105C", x: 0.355, y: 0.415},
  
  // Salas D (101d a 109d) - Linha média centralizada
  { nome: "Sala 101D", x: 0.15, y: 0.45 },
  { nome: "Sala 102D", x: 0.25, y: 0.45 },
  { nome: "Sala 103D", x: 0.35, y: 0.45 },
  { nome: "Sala 104D", x: 0.45, y: 0.45 },
  { nome: "Sala 105D", x: 0.55, y: 0.45 },
  { nome: "Sala 106D", x: 0.65, y: 0.45 },
  { nome: "Sala 107D", x: 0.75, y: 0.45 },
  { nome: "Sala 108D", x: 0.85, y: 0.45 },
  { nome: "Sala 109D", x: 0.95, y: 0.45 },
  
  // Salas E (101e a 110e) - Linha inferior centralizada
  { nome: "Sala 101E", x: 0.1, y: 0.65 },
  { nome: "Sala 102E", x: 0.2, y: 0.65 },
  { nome: "Sala 103E", x: 0.3, y: 0.65 },
  { nome: "Sala 104E", x: 0.4, y: 0.65 },
  { nome: "Sala 105E", x: 0.5, y: 0.65 },
  { nome: "Sala 106E", x: 0.6, y: 0.65 },
  { nome: "Sala 107E", x: 0.7, y: 0.65 },
  { nome: "Sala 108E", x: 0.8, y: 0.65 },
  { nome: "Sala 109E", x: 0.9, y: 0.65 },
  { nome: "Sala 110E", x: 0.95, y: 0.65 },
  
  // Áreas especiais - Parte inferior centralizada
  { nome: "Biblioteca", x: 0.75, y: 0.85 },
  { nome: "Auditório", x: 0.5, y: 0.85 },
  { nome: "Banheiro", x: 0.25, y: 0.85 },
];

// Função para obter cor baseada no nome da sala
const getSalaColor = (nome: string): string => {
  if (nome.includes('101C') || nome.includes('102C') || nome.includes('103C') || nome.includes('104C') || nome.includes('105C')) {
    return '#00FFFF'; // Salas C - Ciano
  }
  if (nome.includes('101D') || nome.includes('102D') || nome.includes('103D') || nome.includes('104D') || nome.includes('105D') || nome.includes('106D') || nome.includes('107D') || nome.includes('108D') || nome.includes('109D')) {
    return '#4CAF50'; // Salas D - Verde
  }
  if (nome.includes('101E') || nome.includes('102E') || nome.includes('103E') || nome.includes('104E') || nome.includes('105E') || nome.includes('106E') || nome.includes('107E') || nome.includes('108E') || nome.includes('109E') || nome.includes('110E')) {
    return '#FF9800'; // Salas E - Laranja
  }
  if (nome.includes('Biblioteca')) {
    return '#2196F3'; // Biblioteca - Azul
  }
  if (nome.includes('Auditório')) {
    return '#F44336'; // Auditório - Vermelho
  }
  if (nome.includes('Banheiro')) {
    return '#9C27B0'; // Banheiro - Roxo
  }
  return '#00BCD4'; // Cor padrão
};

export default function MapaScreen() {
  const [highlightedSala, setHighlightedSala] = useState<Sala | null>(null);
  const [searchResult, setSearchResult] = useState<Sala | null>(null);
  
  // Safe area insets para garantir que o layout não fique atrás dos ícones do sistema
  const insets = useSafeAreaInsets();
  
  // Garantir que os insets sejam sempre positivos
  const safeTop = Math.max(insets.top, 20);
  const safeBottom = Math.max(insets.bottom, 10);
  
  // Animações para zoom e pan
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  
  // Valores base para controle
  const baseScale = useRef(1);
  const baseTranslateX = useRef(0);
  const baseTranslateY = useRef(0);
  
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

  const handleSearch = (sala: Sala | null) => {
    setSearchResult(sala);
    if (sala) {
      setHighlightedSala(sala);
      // Apenas marcar a sala (sem movimento da tela)
      // A sala ficará destacada permanentemente
    } else {
      setHighlightedSala(null);
    }
  };


  const handleResetZoom = () => {
    baseScale.current = 1;
    baseTranslateX.current = 0;
    baseTranslateY.current = 0;
    
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSalaSelect = (sala: Sala) => {
    setHighlightedSala(sala);
  };

  const resetMap = () => {
    setHighlightedSala(null);
    setSearchResult(null);
    handleResetZoom();
  };

  // Handlers de gestos
  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      baseScale.current *= event.nativeEvent.scale;
      scale.setValue(baseScale.current);
    }
  };

  const onPanHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      baseTranslateX.current += event.nativeEvent.translationX;
      baseTranslateY.current += event.nativeEvent.translationY;
      translateX.setValue(baseTranslateX.current);
      translateY.setValue(baseTranslateY.current);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: safeTop, paddingBottom: safeBottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mapa do Primeiro Andar - Unisuam</Text>
        <TouchableOpacity onPress={resetMap} style={styles.resetButton}>
          <Ionicons name="refresh" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          salas={salas}
          onSearch={handleSearch}
          onSalaSelect={handleSalaSelect}
        />
      </View>

      {/* Mapa Container */}
      <View style={styles.mapContainer}>
        <GestureHandlerRootView style={styles.gestureContainer}>
          <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={onPanHandlerStateChange}
            minPointers={1}
            maxPointers={1}
          >
            <Animated.View style={styles.mapWrapper}>
              <PinchGestureHandler
                onGestureEvent={onPinchGestureEvent}
                onHandlerStateChange={onPinchHandlerStateChange}
              >
                <Animated.View
                  style={[
                    styles.mapImage,
                    {
                      transform: [
                        { scale: scale },
                        { translateX: translateX },
                        { translateY: translateY },
                      ],
                    },
                  ]}
                >
                  <ImageBackground
                    source={require('../assets/images/mapa.jpg')}
                    style={styles.mapImageBackground}
                    resizeMode="contain"
                  >
                    {/* Renderizar todos os marcadores */}
                    {salas.map((sala, index) => (
                      <MapMarker
                        key={index}
                        x={sala.x}
                        y={sala.y}
                        highlighted={highlightedSala?.nome === sala.nome}
                        color={getSalaColor(sala.nome)}
                        size={16}  // Tamanho fixo para todas as salas
                      />
                    ))}
                  </ImageBackground>
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>


      {/* Indicador de Zoom */}
      <View style={[styles.zoomIndicator, { top: safeTop + 10 }]}>
        <Animated.Text style={styles.zoomText}>
          {Math.round(baseScale.current * 100)}%
        </Animated.Text>
      </View>


      {/* Botão para limpar seleção */}
      {highlightedSala && (
        <TouchableOpacity style={[styles.clearSelectionButton, { bottom: safeBottom + 150 }]} onPress={() => setHighlightedSala(null)}>
          <Ionicons name="close-circle" size={20} color="#fff" />
          <Text style={styles.clearSelectionText}>Limpar seleção</Text>
        </TouchableOpacity>
      )}

      {/* BottomNav fixo no final */}
      <View style={{ paddingBottom: safeBottom }}>
        <BottomNav />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    flexShrink: 1,
  },
  resetButton: {
    backgroundColor: '#00FFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#00FFFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  gestureContainer: {
    flex: 1,
  },
  mapWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: width,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomIndicator: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: width - 20,
  },
  zoomText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  clearSelectionButton: {
    position: 'absolute',
    bottom: 150,
    right: 10,
    backgroundColor: '#FF4444',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#FF4444',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: width - 20,
  },
  clearSelectionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});