import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { AppColors } from '../constants/theme';


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
    backgroundColor: AppColors.buttonPrimary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
    shadowColor: AppColors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: AppColors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: AppColors.buttonDisabled,
  },
  buttonPressed: {
    opacity: 0.8,
  }
});


export default BotaoCustomizado;