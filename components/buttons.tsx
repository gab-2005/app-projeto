import React from 'react';
import { View, Alert, Text, StyleSheet, Pressable, TextStyle, StyleProp, ViewStyle } from 'react-native';


type BotaoCustomizadoProps = {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>; // Estilo para o container do botão (o Pressable)
    textStyle?: StyleProp<TextStyle>; // Estilo para o texto dentro do botão
    disabled?: boolean;
};


const BotaoCustomizado: React.FC<BotaoCustomizadoProps> = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    // Agora o 'style' é aplicado diretamente ao Pressable, que é a área clicável.
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        disabled && styles.buttonDisabled, // Estilo quando desabilitado
        pressed && styles.buttonPressed, // Estilo quando pressionado
      ]}
      onPress={onPress}
      disabled={disabled}
    >
    <Text style={[styles.text, textStyle]}>
        {title}
    </Text>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  button: {
    backgroundColor: '#761fa8ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  buttonPressed: {
    opacity: 0.5,
  }
});


export default BotaoCustomizado;