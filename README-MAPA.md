# 🗺️ Mapa Unisuam

Aplicativo mobile desenvolvido em React Native com Expo para visualização do mapa do primeiro andar da faculdade Unisuam.

## ✨ Funcionalidades

- **Visualização do Mapa**: Layout visual do primeiro andar com corredores e áreas
- **Busca Inteligente**: Campo de busca com sugestões automáticas
- **Marcadores Interativos**: Pontos coloridos para cada sala com animações
- **Navegação**: Scroll e zoom no mapa
- **Animações**: Efeito de pulso para salas encontradas
- **Design Moderno**: Interface limpa e responsiva

## 🏗️ Estrutura do Projeto

```
app-projeto/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx          # Tela inicial
│   └── mapa.tsx              # Tela do mapa
├── components/
│   ├── MapMarker.tsx         # Componente de marcador
│   └── SearchBar.tsx         # Componente de busca
└── assets/
    └── images/
        └── mapa-primeiro-andar.jpg  # Imagem do mapa (placeholder)
```

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o projeto**:
   ```bash
   npm start
   ```

3. **Executar no dispositivo**:
   - Escaneie o QR code com o app Expo Go
   - Ou pressione `a` para Android / `i` para iOS

## 🎯 Como Usar

1. **Acessar o Mapa**: Na tela inicial, toque em "🗺️ Mapa Unisuam"
2. **Buscar Sala**: Digite o nome da sala no campo de busca
3. **Visualizar Resultado**: A sala encontrada será destacada com animação
4. **Navegar**: Use gestos para mover e dar zoom no mapa
5. **Resetar**: Toque no botão de reset para limpar a busca

## 🏢 Salas Disponíveis

- **Laboratório 101** (Ciano)
- **Sala 102** (Verde)
- **Coordenação** (Laranja)
- **Banheiro** (Roxo)
- **Auditório** (Vermelho)
- **Biblioteca** (Azul)
- **Sala 103** (Azul claro)
- **Cantina** (Laranja escuro)
- **Secretaria** (Cinza azulado)
- **Sala 104** (Azul claro)

## 🎨 Características Técnicas

- **React Native** com Expo
- **TypeScript** para tipagem
- **Animações** com Animated API
- **ScrollView** para navegação
- **Hooks** (useState, useEffect, useRef)
- **Componentes funcionais**
- **Design responsivo**

## 🔧 Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- React Native Animated
- Expo Vector Icons
- React Native Safe Area Context

## 📱 Funcionalidades Extras

- **Sugestões Automáticas**: Lista de salas conforme você digita
- **Animações de Pulso**: Efeito visual para salas encontradas
- **Zoom e Scroll**: Navegação fluida no mapa
- **Botão de Reset**: Volta ao estado inicial
- **Design Responsivo**: Funciona em diferentes tamanhos de tela

## 🎯 Objetivo

Facilitar a localização de salas no primeiro andar da Unisuam, proporcionando uma experiência visual e interativa para estudantes e visitantes.

---

**Desenvolvido por Gabriel — ADS Unisuam** 🎓
