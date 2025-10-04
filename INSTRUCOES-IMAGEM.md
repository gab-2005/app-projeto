# 📸 Como Adicionar Sua Imagem do Mapa

## 📁 Localização do Arquivo

Coloque sua imagem PNG do mapa do primeiro andar em:
```
assets/images/mapa-primeiro-andar.png
```

## 🎯 Especificações Recomendadas

- **Formato**: PNG (com transparência se necessário)
- **Dimensões**: 800x600 pixels (ou proporção similar)
- **Qualidade**: Alta resolução para clareza dos detalhes
- **Orientação**: Paisagem (horizontal)

## 🔧 Como Adicionar

1. **Copie sua imagem** para a pasta `assets/images/`
2. **Renomeie** para `mapa-primeiro-andar.png`
3. **Substitua** o arquivo se já existir

## 📍 Ajustando Coordenadas das Salas

Após adicionar sua imagem, você pode precisar ajustar as coordenadas das salas no arquivo `app/mapa.tsx`:

```typescript
const salas: Sala[] = [
  { nome: "Laboratório 101", x: 0.35, y: 0.4 }, // Ajuste x e y conforme sua imagem
  { nome: "Sala 102", x: 0.5, y: 0.6 },
  // ... outras salas
];
```

### 📐 Como Calcular Coordenadas

- **x**: Posição horizontal (0 = esquerda, 1 = direita)
- **y**: Posição vertical (0 = topo, 1 = baixo)

**Exemplo**: Se uma sala está no meio da imagem:
- x: 0.5 (meio horizontal)
- y: 0.5 (meio vertical)

## ✅ Testando

Após adicionar a imagem:

1. Execute `npm start`
2. Acesse a tela do mapa
3. Verifique se a imagem aparece corretamente
4. Teste a busca de salas
5. Ajuste as coordenadas se necessário

## 🎨 Dicas para Melhor Resultado

- Use uma imagem com boa resolução
- Certifique-se de que as salas estão claramente visíveis
- Teste em diferentes tamanhos de tela
- Considere usar uma imagem com fundo transparente se necessário

---

**Pronto!** Sua imagem será carregada automaticamente no aplicativo. 🚀
