# 🎯 Configuração Individual das Salas - Unisuam

## 📍 **Controle Total de Coordenadas**

### 🔧 **Como Ajustar Cada Sala**

Para ajustar a posição de qualquer sala, edite o arquivo `app/mapa.tsx` na seção `const salas: Sala[]`:

```typescript
const salas: Sala[] = [
  // Salas C (101c a 105c) - Coordenadas personalizáveis
  { nome: "Sala 101C", x: 0.15, y: 0.2 }, // Ajuste x e y conforme necessário
  { nome: "Sala 102C", x: 0.25, y: 0.2 },
  { nome: "Sala 103C", x: 0.35, y: 0.2 },
  { nome: "Sala 104C", x: 0.45, y: 0.2 },
  { nome: "Sala 105C", x: 0.55, y: 0.2 },
  
  // Salas D (101d a 109d) - Coordenadas personalizáveis
  { nome: "Sala 101D", x: 0.15, y: 0.4 },
  { nome: "Sala 102D", x: 0.25, y: 0.4 },
  // ... continue para todas as salas
];
```

### 📐 **Sistema de Coordenadas**

#### **Valores de X e Y**
- **X**: 0.0 = esquerda, 1.0 = direita
- **Y**: 0.0 = topo, 1.0 = baixo
- **Exemplo**: `{ nome: "Sala 101C", x: 0.5, y: 0.5 }` = centro do mapa

#### **Precisão**
- **Valores decimais**: 0.1, 0.2, 0.3, etc.
- **Incrementos**: 0.05 para ajustes finos
- **Exemplo**: 0.15, 0.20, 0.25, 0.30

### 🎨 **Sistema de Cores Automático**

#### **Cores por Bloco**
- **Bloco C**: Ciano (#00FFFF)
- **Bloco D**: Verde (#4CAF50)
- **Bloco E**: Laranja (#FF9800)

#### **Cores por Função**
- **Biblioteca**: Azul (#2196F3)
- **Auditório**: Vermelho (#F44336)
- **Banheiro**: Roxo (#9C27B0)

### 🔧 **Exemplos de Ajustes**

#### **Mover Sala para o Centro**
```typescript
{ nome: "Sala 101C", x: 0.5, y: 0.5 }
```

#### **Mover Sala para o Canto Superior Esquerdo**
```typescript
{ nome: "Sala 101C", x: 0.1, y: 0.1 }
```

#### **Mover Sala para o Canto Inferior Direito**
```typescript
{ nome: "Sala 101C", x: 0.9, y: 0.9 }
```

#### **Ajuste Fino**
```typescript
{ nome: "Sala 101C", x: 0.15, y: 0.25 } // Pequeno ajuste
```

### 📱 **Processo de Ajuste**

#### **1. Identifique a Sala**
- Encontre a sala no array `salas`
- Localize o nome exato (ex: "Sala 101C")

#### **2. Ajuste as Coordenadas**
- **X**: Movimento horizontal (esquerda/direita)
- **Y**: Movimento vertical (topo/baixo)

#### **3. Teste a Posição**
- Execute o app: `npm start`
- Busque pela sala: "Sala 101C"
- Verifique se está na posição correta

#### **4. Refine se Necessário**
- Ajuste os valores de X e Y
- Teste novamente
- Repita até ficar perfeito

### 🎯 **Dicas de Posicionamento**

#### **Para Salas Próximas**
- **X**: Incrementos de 0.1 (0.1, 0.2, 0.3, etc.)
- **Y**: Mesmo valor para alinhamento

#### **Para Salas em Linha**
- **X**: Valores diferentes (0.1, 0.2, 0.3, 0.4, 0.5)
- **Y**: Mesmo valor para todas

#### **Para Salas em Coluna**
- **X**: Mesmo valor para todas
- **Y**: Valores diferentes (0.1, 0.2, 0.3, 0.4, 0.5)

### 🔍 **Verificação**

#### **Como Testar**
1. **Busque a sala**: Digite o nome no campo de busca
2. **Veja a posição**: Sala será destacada e centralizada
3. **Ajuste se necessário**: Modifique X e Y
4. **Teste novamente**: Repita o processo

#### **Indicadores Visuais**
- **Marcador colorido**: Mostra a posição atual
- **Animação de pulso**: Quando sala é encontrada
- **Zoom automático**: Centraliza a sala

### 📋 **Lista Completa para Ajuste**

#### **Salas C (5 salas)**
- Sala 101C, 102C, 103C, 104C, 105C

#### **Salas D (9 salas)**
- Sala 101D, 102D, 103D, 104D, 105D, 106D, 107D, 108D, 109D

#### **Salas E (10 salas)**
- Sala 101E, 102E, 103E, 104E, 105E, 106E, 107E, 108E, 109E, 110E

#### **Áreas Especiais (3 áreas)**
- Biblioteca, Auditório, Banheiro

---

**Total**: 27 salas com controle individual de coordenadas! 🎯

## 🚀 **Próximos Passos**

1. **Adicione sua imagem**: `mapa.jpg` em `assets/images/`
2. **Ajuste as coordenadas**: Conforme sua imagem
3. **Teste cada sala**: Busque e verifique a posição
4. **Refine se necessário**: Ajuste X e Y até ficar perfeito

**Agora você tem controle total sobre cada localização!** 🎯✨
