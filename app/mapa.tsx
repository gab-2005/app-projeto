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
import HeaderPerfil from '../components/HeaderPerfil';
import SearchBar from '../components/SearchBar';

const { width, height } = Dimensions.get('window');

interface Sala {
  nome: string;
  imagem: string;
}

// Dados das salas - todas usando mapa1.png por enquanto
const salas: Sala[] = [
  // Salas C (101c a 105c)
  { nome: "Sala 101C", imagem: "mapa1.png" },
  { nome: "Sala 102C", imagem: "mapa1.png" },
  { nome: "Sala 103C", imagem: "mapa1.png" },
  { nome: "Sala 104C", imagem: "mapa1.png" },
  { nome: "Sala 105C", imagem: "mapa1.png" },
  
  // Salas D (101d a 109d)
  { nome: "Sala 101D", imagem: "mapa1.png" },
  { nome: "Sala 102D", imagem: "mapa1.png" },
  { nome: "Sala 103D", imagem: "mapa1.png" },
  { nome: "Sala 104D", imagem: "mapa1.png" },
  { nome: "Sala 105D", imagem: "mapa1.png" },
  { nome: "Sala 106D", imagem: "mapa1.png" },
  { nome: "Sala 107D", imagem: "mapa1.png" },
  { nome: "Sala 108D", imagem: "mapa1.png" },
  { nome: "Sala 109D", imagem: "mapa1.png" },
  
  // Salas E (101e a 110e)
  { nome: "Sala 101E", imagem: "mapa1.png" },
  { nome: "Sala 102E", imagem: "mapa1.png" },
  { nome: "Sala 103E", imagem: "mapa1.png" },
  { nome: "Sala 104E", imagem: "mapa1.png" },
  { nome: "Sala 105E", imagem: "mapa1.png" },
  { nome: "Sala 106E", imagem: "mapa1.png" },
  { nome: "Sala 107E", imagem: "mapa1.png" },
  { nome: "Sala 108E", imagem: "mapa1.png" },
  { nome: "Sala 109E", imagem: "mapa1.png" },
  { nome: "Sala 110E", imagem: "mapa1.png" },
  
  // Áreas especiais
  { nome: "Biblioteca", imagem: "mapa1.png" },
  { nome: "Auditório", imagem: "mapa1.png" },
  { nome: "Banheiro", imagem: "mapa1.png" },
];

// Função para obter a imagem correta
const getImageSource = (imageName: string) => {
  switch (imageName) {
    // Imagem padrão
    case 'mapa1.png':
      return require('../assets/images/mapa1.png');
    
    // Salas C - por enquanto todas usam mapa1.png
    case 'sala101c.png':
      return require('../assets/images/mapa1.png');
    case 'sala102c.png':
      return require('../assets/images/mapa1.png');
    case 'sala103c.png':
      return require('../assets/images/mapa1.png');
    case 'sala104c.png':
      return require('../assets/images/mapa1.png');
    case 'sala105c.png':
      return require('../assets/images/mapa1.png');
    
    // Salas D - por enquanto todas usam mapa1.png
    case 'sala101d.png':
      return require('../assets/images/mapa1.png');
    case 'sala102d.png':
      return require('../assets/images/mapa1.png');
    case 'sala103d.png':
      return require('../assets/images/mapa1.png');
    case 'sala104d.png':
      return require('../assets/images/mapa1.png');
    case 'sala105d.png':
      return require('../assets/images/mapa1.png');
    case 'sala106d.png':
      return require('../assets/images/mapa1.png');
    case 'sala107d.png':
      return require('../assets/images/mapa1.png');
    case 'sala108d.png':
      return require('../assets/images/mapa1.png');
    case 'sala109d.png':
      return require('../assets/images/mapa1.png');
    
    // Salas E - por enquanto todas usam mapa1.png
    case 'sala101e.png':
      return require('../assets/images/mapa1.png');
    case 'sala102e.png':
      return require('../assets/images/mapa1.png');
    case 'sala103e.png':
      return require('../assets/images/mapa1.png');
    case 'sala104e.png':
      return require('../assets/images/mapa1.png');
    case 'sala105e.png':
      return require('../assets/images/mapa1.png');
    case 'sala106e.png':
      return require('../assets/images/mapa1.png');
    case 'sala107e.png':
      return require('../assets/images/mapa1.png');
    case 'sala108e.png':
      return require('../assets/images/mapa1.png');
    case 'sala109e.png':
      return require('../assets/images/mapa1.png');
    case 'sala110e.png':
      return require('../assets/images/mapa1.png');
    
    // Áreas especiais - por enquanto todas usam mapa1.png
    case 'biblioteca.png':
      return require('../assets/images/mapa1.png');
    case 'auditorio.png':
      return require('../assets/images/mapa1.png');
    case 'banheiro.png':
      return require('../assets/images/mapa1.png');
    
    default:
      return require('../assets/images/mapa1.png');
  }
};


export default function MapaScreen() {
  const [selectedSala, setSelectedSala] = useState<Sala | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("mapa1.png");
  
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
  
  // Configurações otimizadas para melhor controle
  const MIN_ZOOM = 0.8; // Zoom mínimo mais restritivo
  const MAX_ZOOM = 2.5; // Zoom máximo mais controlado
  const RESET_THRESHOLD = 0.85; // Retorna quando expandir demais
  const ZOOM_OUT_THRESHOLD = 0.9; // Retorna quando afastar demais





  
  // Função para calcular limites rigorosos da tela - melhorada para evitar sair da tela
  const getScreenLimits = (currentScale: number) => {
    const imageWidth = width;
    const imageHeight = height * 0.7; // Ajustado para nova altura
    const scaledWidth = imageWidth * currentScale;
    const scaledHeight = imageHeight * currentScale;
    
    // Calcular limites para manter imagem sempre visível
    const maxTranslateX = Math.max(0, (scaledWidth - width) / 2);
    const maxTranslateY = Math.max(0, (scaledHeight - height * 0.7) / 2);
    
    // Limites mais rigorosos - sempre manter o mapa visível
    const strictMinX = Math.min(-maxTranslateX, -width * 0.15); // Máximo 15% da tela para fora
    const strictMaxX = Math.max(maxTranslateX, width * 0.15);   // Máximo 15% da tela para fora
    const strictMinY = Math.min(-maxTranslateY, -height * 0.1); // Máximo 10% da tela para fora
    const strictMaxY = Math.max(maxTranslateY, height * 0.1);   // Máximo 10% da tela para fora
    
    return {
      minX: strictMinX,
      maxX: strictMaxX,
      minY: strictMinY,
      maxY: strictMaxY
    };
  };

  const handleSearch = (sala: Sala | null) => {
    if (sala) {
      setSelectedSala(sala);
      setCurrentImage(sala.imagem);
    } else {
      setSelectedSala(null);
      setCurrentImage("mapa1.png");
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

  const resetMap = () => {
    setSelectedSala(null);
    setCurrentImage("mapa1.png");
    handleResetZoom();
  };

  // Handler de zoom melhorado para melhor controle
  const onPinchGestureEvent = (event: any) => {
    const { scale: gestureScale, focalX: gestureFocalX, focalY: gestureFocalY } = event.nativeEvent;
    
    // Capturar ponto focal (onde o usuário tocou)
    focalX.current = gestureFocalX - width / 2;
    focalY.current = gestureFocalY - (height * 0.7) / 2;
    
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
    
    // Aplicar transformações com suavização
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

  // Handler de pan melhorado para evitar sair da tela
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
    const finalTranslateX = Math.max(-width * 0.2, Math.min(width * 0.2, clampedTranslateX));
    const finalTranslateY = Math.max(-height * 0.15, Math.min(height * 0.15, clampedTranslateY));
    
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
      baseTranslateX.current = Math.max(-width * 0.2, Math.min(width * 0.2, clampedX));
      baseTranslateY.current = Math.max(-height * 0.15, Math.min(height * 0.15, clampedY));
      
      // Atualizar valores finais
      translateX.setValue(baseTranslateX.current);
      translateY.setValue(baseTranslateY.current);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Container principal com Safe Area */}
      <View style={[styles.container, { paddingTop: safeTop }]}>
        {/* Header fixo */}
        <HeaderPerfil title="Mapa" />

      {/* Search Bar Moderna */}
      <View style={styles.searchContainer}>
        <SearchBar
          salas={salas}
          onSearch={handleSearch}
          onSalaSelect={handleSearch}
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
                      source={getImageSource(currentImage)}
                      style={styles.mapImageBackground}
                      resizeMode="contain"
                    />
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

      {/* Indicador de Sala Selecionada */}
      {selectedSala && (
        <View style={[styles.imageIndicator, { top: safeTop + 50 }]}>
          <Text style={styles.imageText}>
            {selectedSala.nome}
          </Text>
        </View>
      )}







      {/* Botão para resetar zoom */}
      <TouchableOpacity style={[styles.resetZoomButton, { bottom: 80 }]} onPress={handleResetZoom}>
        <Ionicons name="refresh" size={20} color="#fff" />
        <Text style={styles.resetZoomText}>Resetar Zoom</Text>
      </TouchableOpacity>

      {/* Botão para limpar seleção */}
      {selectedSala && (
        <TouchableOpacity style={[styles.clearSelectionButton, { bottom: 130 }]} onPress={resetMap}>
          <Ionicons name="close-circle" size={20} color="#fff" />
          <Text style={styles.clearSelectionText}>Voltar ao mapa geral</Text>
        </TouchableOpacity>
      )}

      </View>

      {/* BottomNav fixo no final - fora do container principal */}
      <View style={styles.bottomNavContainer}>
        <BottomNav />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 100,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    zIndex: 1,
    paddingTop: 10, // Adiciona espaço no topo
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
    height: height * 0.7, // Aumentado para 0.7 para ficar mais acima
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
  resetZoomButton: {
    position: 'absolute',
    bottom: 80,
    right: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: width - 20,
  },
  resetZoomText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  imageIndicator: {
    position: 'absolute',
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: width - 20,
  },
  imageText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});