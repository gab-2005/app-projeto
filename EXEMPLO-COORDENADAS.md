# 📐 Exemplo de Coordenadas - Salas Unisuam

## 🎯 **Coordenadas Organizadas por Blocos**

### 📚 **Bloco C - Salas 101C a 105C**

```typescript
// Salas C - Linha superior
{ nome: "Sala 101C", x: 0.10, y: 0.15 }, // Canto superior esquerdo
{ nome: "Sala 102C", x: 0.25, y: 0.15 }, // Meio superior esquerdo
{ nome: "Sala 103C", x: 0.40, y: 0.15 }, // Centro superior
{ nome: "Sala 104C", x: 0.55, y: 0.15 }, // Meio superior direito
{ nome: "Sala 105C", x: 0.70, y: 0.15 }, // Canto superior direito
```

### 📚 **Bloco D - Salas 101D a 109D**

```typescript
// Salas D - Linha média
{ nome: "Sala 101D", x: 0.10, y: 0.35 }, // Canto esquerdo
{ nome: "Sala 102D", x: 0.20, y: 0.35 }, // Meio esquerdo
{ nome: "Sala 103D", x: 0.30, y: 0.35 }, // Centro esquerdo
{ nome: "Sala 104D", x: 0.40, y: 0.35 }, // Centro
{ nome: "Sala 105D", x: 0.50, y: 0.35 }, // Centro direito
{ nome: "Sala 106D", x: 0.60, y: 0.35 }, // Meio direito
{ nome: "Sala 107D", x: 0.70, y: 0.35 }, // Canto direito
{ nome: "Sala 108D", x: 0.80, y: 0.35 }, // Canto direito
{ nome: "Sala 109D", x: 0.90, y: 0.35 }, // Canto direito
```

### 📚 **Bloco E - Salas 101E a 110E**

```typescript
// Salas E - Linha inferior
{ nome: "Sala 101E", x: 0.05, y: 0.55 }, // Canto inferior esquerdo
{ nome: "Sala 102E", x: 0.15, y: 0.55 }, // Meio inferior esquerdo
{ nome: "Sala 103E", x: 0.25, y: 0.55 }, // Centro inferior esquerdo
{ nome: "Sala 104E", x: 0.35, y: 0.55 }, // Centro inferior
{ nome: "Sala 105E", x: 0.45, y: 0.55 }, // Centro inferior
{ nome: "Sala 106E", x: 0.55, y: 0.55 }, // Centro inferior direito
{ nome: "Sala 107E", x: 0.65, y: 0.55 }, // Meio inferior direito
{ nome: "Sala 108E", x: 0.75, y: 0.55 }, // Canto inferior direito
{ nome: "Sala 109E", x: 0.85, y: 0.55 }, // Canto inferior direito
{ nome: "Sala 110E", x: 0.95, y: 0.55 }, // Canto inferior direito
```

### 🏢 **Áreas Especiais**

```typescript
// Áreas especiais - Parte inferior
{ nome: "Biblioteca", x: 0.75, y: 0.75 }, // Canto inferior direito
{ nome: "Auditório", x: 0.25, y: 0.75 }, // Centro inferior
{ nome: "Banheiro", x: 0.05, y: 0.75 }, // Canto inferior esquerdo
```

## 🎨 **Sistema de Cores Automático**

### **Cores por Bloco**
- **Bloco C**: Ciano (#00FFFF) - 5 salas
- **Bloco D**: Verde (#4CAF50) - 9 salas
- **Bloco E**: Laranja (#FF9800) - 10 salas

### **Cores por Função**
- **Biblioteca**: Azul (#2196F3)
- **Auditório**: Vermelho (#F44336)
- **Banheiro**: Roxo (#9C27B0)

## 📐 **Padrões de Coordenadas**

### **Para Salas em Linha**
```typescript
// Exemplo: Salas C em linha horizontal
{ nome: "Sala 101C", x: 0.10, y: 0.15 }, // Mesmo Y, X diferentes
{ nome: "Sala 102C", x: 0.25, y: 0.15 },
{ nome: "Sala 103C", x: 0.40, y: 0.15 },
```

### **Para Salas em Coluna**
```typescript
// Exemplo: Salas em coluna vertical
{ nome: "Sala 101C", x: 0.10, y: 0.15 }, // Mesmo X, Y diferentes
{ nome: "Sala 101D", x: 0.10, y: 0.35 },
{ nome: "Sala 101E", x: 0.10, y: 0.55 },
```

### **Para Salas em Grid**
```typescript
// Exemplo: Grid 3x3
{ nome: "Sala 101C", x: 0.10, y: 0.15 }, // Linha 1, Coluna 1
{ nome: "Sala 102C", x: 0.40, y: 0.15 }, // Linha 1, Coluna 2
{ nome: "Sala 103C", x: 0.70, y: 0.15 }, // Linha 1, Coluna 3
{ nome: "Sala 101D", x: 0.10, y: 0.35 }, // Linha 2, Coluna 1
{ nome: "Sala 102D", x: 0.40, y: 0.35 }, // Linha 2, Coluna 2
{ nome: "Sala 103D", x: 0.70, y: 0.35 }, // Linha 2, Coluna 3
```

## 🔧 **Como Aplicar**

### **1. Copie as Coordenadas**
- Selecione o bloco desejado
- Copie as coordenadas X e Y

### **2. Cole no Código**
- Abra `app/mapa.tsx`
- Localize a seção `const salas: Sala[]`
- Substitua as coordenadas

### **3. Teste**
- Execute: `npm start`
- Busque por uma sala
- Verifique a posição

### **4. Ajuste se Necessário**
- Modifique X e Y conforme sua imagem
- Teste novamente
- Repita até ficar perfeito

---

**Agora você tem exemplos organizados para todas as salas!** 🎯✨

## 🚀 **Próximos Passos**

1. **Escolha um padrão**: Linha, coluna ou grid
2. **Copie as coordenadas**: Do exemplo desejado
3. **Cole no código**: Substitua no arquivo `mapa.tsx`
4. **Teste e ajuste**: Conforme sua imagem real

**Controle total sobre cada localização!** 🎯
