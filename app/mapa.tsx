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
  { nome: "Sala 101C", x: 0.130, y: 0.420 },
  { nome: "Sala 102C", x: 0.190, y: 0.420 },
  { nome: "Sala 103C", x: 0.245, y: 0.420},
  { nome: "Sala 104C", x: 0.300, y: 0.420},
  { nome: "Sala 105C", x: 0.365, y: 0.420},
  
  // Salas D (101d a 109d) - Linha média centralizada
  { nome: "Sala 101D", x: 0.69, y: 0.42 },
  { nome: "Sala 102D", x: 0.69, y: 0.50 },
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
  
  // Animações simplificadas para zoom suave
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  
  // Valores base para controle
  const baseScale = useRef(1);
  const baseTranslateX = useRef(0);
  const baseTranslateY = useRef(0);
  
  // Ponto focal do zoom
  const focalX = useRef(0);
  const focalY = useRef(0);
  
  // Configurações otimizadas
  const MIN_ZOOM = 0.5; // Zoom mínimo para não bagunçar layout
  const MAX_ZOOM = 3.0; // Zoom máximo controlado
  const RESET_THRESHOLD = 0.6; // Retorna quando expandir demais
  const ZOOM_OUT_THRESHOLD = 0.9; // Retorna quando afastar (zoom out) demais
  
  // Função para calcular limites rigorosos da tela
  const getScreenLimits = (currentScale: number) => {
    const imageWidth = width;
    const imageHeight = height * 0.6;
    const scaledWidth = imageWidth * currentScale;
    const scaledHeight = imageHeight * currentScale;
    
    // Calcular limites para manter imagem sempre visível
    const maxTranslateX = Math.max(0, (scaledWidth - width) / 2);
    const maxTranslateY = Math.max(0, (scaledHeight - height * 0.6) / 2);
    
    // Limites mais rigorosos - sempre manter parte do mapa visível
    const strictMinX = Math.min(-maxTranslateX, -width * 0.3); // Máximo 30% da tela para fora
    const strictMaxX = Math.max(maxTranslateX, width * 0.3);   // Máximo 30% da tela para fora
    const strictMinY = Math.min(-maxTranslateY, -height * 0.2); // Máximo 20% da tela para fora
    const strictMaxY = Math.max(maxTranslateY, height * 0.2);   // Máximo 20% da tela para fora
    
    return {
      minX: strictMinX,
      maxX: strictMaxX,
      minY: strictMinY,
      maxY: strictMaxY
    };
  };

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
    // Resetar todos os valores
    baseScale.current = 1;
    baseTranslateX.current = 0;
    baseTranslateY.current = 0;
    focalX.current = 0;
    focalY.current = 0;
    
    // Animação suave de retorno
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
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

  // Handler de zoom estável sem movimento indesejado
  const onPinchGestureEvent = (event: any) => {
    const { scale: gestureScale, focalX: gestureFocalX, focalY: gestureFocalY } = event.nativeEvent;
    
    // Capturar ponto focal (onde o usuário tocou)
    focalX.current = gestureFocalX - width / 2;
    focalY.current = gestureFocalY - (height * 0.6) / 2; // Ajustado para nova altura
    
    // Aplicar zoom com limites mais restritivos
    const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, gestureScale));
    
    // Calcular translação para manter foco no ponto tocado
    const scaleFactor = newScale - 1;
    const newTranslateX = -focalX.current * scaleFactor;
    const newTranslateY = -focalY.current * scaleFactor;
    
    // Aplicar limites da tela com mais precisão
    const limits = getScreenLimits(newScale);
    const clampedTranslateX = Math.max(limits.minX, Math.min(limits.maxX, newTranslateX));
    const clampedTranslateY = Math.max(limits.minY, Math.min(limits.maxY, newTranslateY));
    
    // Aplicar transformações diretamente sem animação
    scale.setValue(newScale);
    translateX.setValue(clampedTranslateX);
    translateY.setValue(clampedTranslateY);
    
    // Atualizar valores base imediatamente
    baseScale.current = newScale;
    baseTranslateX.current = clampedTranslateX;
    baseTranslateY.current = clampedTranslateY;
  };

  const onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
      const currentZoom = baseScale.current;
      
      // Retornar automaticamente se expandir demais (para não bagunçar layout)
      if (currentZoom < RESET_THRESHOLD) {
        handleResetZoom();
      }
      // Retornar automaticamente se afastar demais (zoom out)
      else if (currentZoom < ZOOM_OUT_THRESHOLD) {
        handleResetZoom();
      }
      // Manter zoom se estiver dentro dos limites aceitáveis
    }
  };

  // Handler de pan com limites rigorosos
  const onPanGestureEvent = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;
    const currentScale = baseScale.current;
    
    // Calcular nova posição
    const newTranslateX = baseTranslateX.current + translationX;
    const newTranslateY = baseTranslateY.current + translationY;
    
    // Aplicar limites rigorosos da tela
    const limits = getScreenLimits(currentScale);
    const clampedTranslateX = Math.max(limits.minX, Math.min(limits.maxX, newTranslateX));
    const clampedTranslateY = Math.max(limits.minY, Math.min(limits.maxY, newTranslateY));
    
    // Validação adicional: garantir que o mapa sempre fique visível
    const finalTranslateX = Math.max(-width * 0.4, Math.min(width * 0.4, clampedTranslateX));
    const finalTranslateY = Math.max(-height * 0.3, Math.min(height * 0.3, clampedTranslateY));
    
    // Aplicar movimento com limites rigorosos
    translateX.setValue(finalTranslateX);
    translateY.setValue(finalTranslateY);
  };

  const onPanHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END || event.nativeEvent.state === State.CANCELLED) {
      const currentScale = baseScale.current;
      const limits = getScreenLimits(currentScale);
      
      // Atualizar posição base com limites rigorosos
      const newBaseTranslateX = baseTranslateX.current + event.nativeEvent.translationX;
      const newBaseTranslateY = baseTranslateY.current + event.nativeEvent.translationY;
      
      // Aplicar limites finais rigorosos
      const clampedX = Math.max(limits.minX, Math.min(limits.maxX, newBaseTranslateX));
      const clampedY = Math.max(limits.minY, Math.min(limits.maxY, newBaseTranslateY));
      
      // Validação final: garantir que o mapa sempre fique visível
      baseTranslateX.current = Math.max(-width * 0.4, Math.min(width * 0.4, clampedX));
      baseTranslateY.current = Math.max(-height * 0.3, Math.min(height * 0.3, clampedY));
      
      // Atualizar valores finais
      translateX.setValue(baseTranslateX.current);
      translateY.setValue(baseTranslateY.current);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: safeTop, paddingBottom: safeBottom }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      

      {/* Search Bar Moderna */}
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
          <Animated.View style={styles.mapWrapper}>
            <PanGestureHandler
              onGestureEvent={onPanGestureEvent}
              onHandlerStateChange={onPanHandlerStateChange}
              minPointers={1}
              maxPointers={1}
            >
              <Animated.View>
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
                      source={require('../assets/images/mapa1.png')}
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
          </Animated.View>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#667eea',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 100,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    zIndex: 1,
    marginBottom: 80, // Reduzido de 100 para 80
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
    height: height * 0.6, // Reduzido de 0.7 para 0.6
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