# 📱 Mapa Unisuam - Versão Responsiva

## ✅ **Melhorias Implementadas**

### 🎯 **Layout Responsivo**
- **Tamanho adaptativo**: O mapa agora se ajusta ao tamanho da tela do celular
- **Dimensões dinâmicas**: Usa `width * 1.2` e `height * 0.8` para melhor visualização
- **Zoom inteligente**: Zoom automático para 2x quando uma sala é encontrada

### 🔍 **Controles de Zoom**
- **Botão +**: Aumenta o zoom (máximo 3x)
- **Botão -**: Diminui o zoom (mínimo 0.5x)
- **Botão ↻**: Reset do zoom e posição
- **Posição**: Controles flutuantes no lado direito da tela

### 📐 **Funcionalidades**
- **Zoom com gestos**: Pinch to zoom nativo
- **Scroll suave**: Navegação horizontal e vertical
- **Centralização automática**: Sala encontrada é centralizada automaticamente
- **Animações fluidas**: Transições suaves entre zoom e posições

## 🎮 **Como Usar**

### **Navegação Básica**
1. **Scroll**: Arraste para mover pelo mapa
2. **Zoom**: Use os botões + e - ou gestos de pinça
3. **Busca**: Digite o nome da sala e toque em buscar
4. **Reset**: Toque no botão ↻ para voltar ao estado inicial

### **Busca Inteligente**
1. **Digite** o nome da sala (ex: "Laboratório 101")
2. **Toque** em buscar ou selecione da lista
3. **Veja** a animação de destaque
4. **Navegue** automaticamente para a sala

## 📱 **Adaptação para Celular**

### **Tamanhos Responsivos**
- **Pequeno**: Zoom 0.5x para visão geral
- **Médio**: Zoom 1x para navegação normal  
- **Grande**: Zoom 2x para detalhes
- **Máximo**: Zoom 3x para máxima precisão

### **Controles Intuitivos**
- **Botões grandes**: 50x50px para fácil toque
- **Posição fixa**: Sempre visíveis no lado direito
- **Cores contrastantes**: Azul neon para destaque
- **Sombras**: Efeito de profundidade

## 🔧 **Configurações Técnicas**

### **Dimensões do Mapa**
```typescript
width: width * 1.2 * zoomLevel
height: height * 0.8 * zoomLevel
```

### **Níveis de Zoom**
- **Mínimo**: 0.5x (visão geral)
- **Padrão**: 1x (navegação normal)
- **Busca**: 2x (detalhes da sala)
- **Máximo**: 3x (máxima precisão)

### **Scroll Automático**
```typescript
// Centraliza a sala encontrada
x: sala.x * width * 1.2 - width / 2
y: sala.y * height * 0.8 - height / 2
```

## 🎨 **Design Melhorado**

### **Interface Limpa**
- **Controles flutuantes**: Não interferem na visualização
- **Cores consistentes**: Azul neon para elementos interativos
- **Sombras suaves**: Efeito de profundidade
- **Animações fluidas**: Transições suaves

### **Experiência do Usuário**
- **Feedback visual**: Animações de pulso para salas encontradas
- **Navegação intuitiva**: Gestos naturais de zoom e scroll
- **Busca eficiente**: Sugestões automáticas e validação
- **Reset rápido**: Volta ao estado inicial com um toque

## 🚀 **Próximos Passos**

1. **Adicione sua imagem** como `mapa.jpg` em `assets/images/`
2. **Teste o aplicativo** com `npm start`
3. **Ajuste as coordenadas** das salas se necessário
4. **Personalize as cores** dos marcadores se desejar

---

**Resultado**: Mapa totalmente responsivo e otimizado para celular! 📱✨
