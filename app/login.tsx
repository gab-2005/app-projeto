import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import BotaoCustomizado from '../components/buttons';
import { useSettings } from '../hooks/useSettings';


//Validações
const schema = yup.object({
  email: yup.string().email("E-mail inválido!").required("Informe seu e-mail."),
  password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos.").max(14, "Senha muito longa. Menos de 14 caracteres, por favor.").required("Informe sua senha."),
});


export default function telaLogin () {
  const router = useRouter();
  const { colors, vibrate } = useSettings();

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);

  const [isChecked, setItChecked] = useState(false);

  //Função de envio
  async function handleSignIn(data: any) {
    setLoading(true);

    try {
      // Simular login bem-sucedido
      const userToken = 'token_' + Date.now(); // Token simulado
      
      // Salvar dados de login no AsyncStorage
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userEmail', data.email);
      
      // Salvar dados básicos se não existirem
      const existingName = await AsyncStorage.getItem('userName');
      if (!existingName) {
        await AsyncStorage.setItem('userName', 'Usuário');
        await AsyncStorage.setItem('userPhone', '(11) 99999-9999');
        await AsyncStorage.setItem('userAddress', 'Endereço não informado');
      }
      
      setTimeout(() => {
        setLoading(false);
        router.replace('/');
      }, 2000);
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      setLoading(false);
    }
  } 

  return (
    <View style={styles.containerPrincipal}>
      <LinearGradient
        //Cores do Gradiente (do topo para baixo)
        colors={['#9560e1', '#005c83']}
        style={styles.gradient}
      />
      
      <SafeAreaView style={styles.container}>
        <StatusBar 
          barStyle="light-content" //Deixa o texto da barra (relógio, etc.) branco
          backgroundColor="transparent" //Cor de fundo da barra
          translucent //Faz o app preencher a área da barra de status
        />
      
        <Image source={require("../assets/images/logotipo-coruja.png")} style={styles.img} />
              
        <Text style={styles.text}>Login</Text>

        {/*E-mail*/}
        <Controller control={control} name='email' render={({ field: {onChange, onBlur, value} }) => (
          <TextInput style={[styles.input, {
            borderWidth: errors.email && 1,
            borderColor: errors.email && colors.primary,
          }]} onChangeText={onChange} 
          onBlur={onBlur} //Chamado qunado o TextInput é tocado
          value={value} 
          placeholder='seuemail@souunisuam.com.br'
          placeholderTextColor={colors.text + '60'} 
          accessibilityLabel='Campo de e-mail' />
        )} />
        {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}
        
        {/*Senha*/}
        <Controller control={control} name='password' render={({ field: {onChange, onBlur, value} }) => (
          <TextInput style={[styles.input, {
            borderWidth: errors.password && 1,
            borderColor: errors.password && colors.primary,
          }]} onChangeText={onChange} 
          onBlur={onBlur} //Chamado qunado o TextInput é tocado
          value={value} 
          placeholder='Insira sua senha'
          placeholderTextColor={colors.text + '60'}
          accessibilityLabel='Campo de senha'
          secureTextEntry={true} />
        )} />
        {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

        <View style={styles.row}>
          <Switch
            value={isChecked}
            onValueChange={setItChecked}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={isChecked ? '#FFFFFF' : colors.border}
            accessible= {true}
            accessibilityLabel='Mantenha-me conectado'
            accessibilityHint="Ativa ou desativa se manter conectado no app"
            accessibilityState={{checked: isChecked}}
          />

          <Text style={styles.text2}>Mantenha-me conectado</Text>
        </View>

        {/*Botão 'Acessar'*/}
        <TouchableOpacity style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleSubmit(handleSignIn)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.text2}>Você é novo por aqui?</Text>

        <Link href="/cadastro" asChild>
          <BotaoCustomizado title='Criar uma conta' onPress={()=> 'void'}/>
        </Link>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  text: { 
    textAlign: 'left',
    fontSize: 30,
    marginBottom: 16,
    fontWeight: 800,
    width: '100%',
    color: '#FFFFFF',
  },
  text2: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  input: {
    fontSize: 18,
    width: '100%',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: 'rgba(126, 87, 194, 1.00)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    bottom: 10,
    borderWidth: 0,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelError: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#7e57c2',
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  img: {
    alignSelf: 'center',
    width: 150, 
    height: 100,
    bottom: 50,
  }
});