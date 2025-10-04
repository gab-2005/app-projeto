# 📸 Como Adicionar Sua Imagem do Mapa

## ❌ Erro Atual
O arquivo `mapa.jpn` não existe. Você precisa adicionar sua imagem do mapa.

## ✅ Solução

### 1. **Adicione sua imagem** na pasta:
```
assets/images/mapa.jpg
```

### 2. **Formatos suportados**:
- `.jpg` ou `.jpeg`
- `.png`
- Qualidade alta recomendada

### 3. **Passos**:
1. Copie sua imagem do mapa para `assets/images/`
2. Renomeie para `mapa.jpg`
3. Execute `npm start` novamente

## 🔧 Alternativa Temporária

Se quiser testar sem imagem, posso criar um layout visual temporário. Me avise!

## 📐 Ajustando Coordenadas

Após adicionar sua imagem, você pode precisar ajustar as posições das salas no arquivo `app/mapa.tsx`:

```typescript
const salas: Sala[] = [
  { nome: "Laboratório 101", x: 0.35, y: 0.4 }, // Ajuste conforme sua imagem
  { nome: "Sala 102", x: 0.5, y: 0.6 },
  // ...
];
```

**Coordenadas**:
- `x`: 0 = esquerda, 1 = direita  
- `y`: 0 = topo, 1 = baixo

## 🎯 Próximos Passos

1. ✅ Adicione sua imagem como `mapa.jpg`
2. ✅ Teste o aplicativo
3. ✅ Ajuste as coordenadas das salas se necessário
4. ✅ Pronto para usar!

---

**Dica**: Use uma imagem com boa resolução para melhor visualização! 🚀
