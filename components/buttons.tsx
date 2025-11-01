import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
// AppColors removido - usando cores dinâmicas
import { useAppTheme } from './ThemeContext';


type BotaoCustomizadoProps = {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>; // Estilo para o container do botão (o Pressable)
    textStyle?: StyleProp<TextStyle>; // Estilo para o texto dentro do botão
    disabled?: boolean;
};


const BotaoCustomizado: React.FC<BotaoCustomizadoProps> = ({ title, onPress, style, textStyle, disabled }) => {
  const { vibrate, colors } = useAppTheme();

  const handlePress = () => {
    vibrate();
    onPress();
  };

  const dynamicStyles = StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      width: '100%',
      height: 50,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    text: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonDisabled: {
      backgroundColor: colors.border,
      opacity: 0.6,
    },
    buttonPressed: {
      opacity: 0.8,
    }
  });

  return (
    <Pressable
      style={({ pressed }) => [
        dynamicStyles.button,
        style,
        disabled && dynamicStyles.buttonDisabled,
        pressed && dynamicStyles.buttonPressed,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={[dynamicStyles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};





export default BotaoCustomizado;