import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import BotaoCustomizado from '../components/buttons';
import { AppColors } from '../constants/theme';


//Validações
const schema = yup.object({
  email: yup.string().email("E-mail inválido!").required("Informe seu e-mail."),
  password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos.").max(14, "Senha muito longa. Menos de 14 caracteres, por favor.").required("Informe sua senha."),
});


export default function telaLogin () {
  const router = useRouter();

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);

  const [isChecked, setItChecked] = useState(false);

  //Função de envio
  async function handleSignIn() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.replace('/');
    }, 2000);
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
            borderColor: errors.email && '#ff375b',
          }]} onChangeText={onChange} 
          onBlur={onBlur} //Chamado qunado o TextInput é tocado
          value={value} 
          placeholder='seuemail@souunisuam.com.br'
          placeholderTextColor={AppColors.textLight} 
          accessibilityLabel='Campo de e-mail' />
        )} />
        {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}
        
        {/*Senha*/}
        <Controller control={control} name='password' render={({ field: {onChange, onBlur, value} }) => (
          <TextInput style={[styles.input, {
            borderWidth: errors.password && 1,
            borderColor: errors.password && '#ff375b',
          }]} onChangeText={onChange} 
          onBlur={onBlur} //Chamado qunado o TextInput é tocado
          value={value} 
          placeholder='Insira sua senha'
          placeholderTextColor={AppColors.textLight}
          accessibilityLabel='Campo de senha'
          secureTextEntry={true} />
        )} />
        {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

        <View style={styles.row}>
          <Switch
            value={isChecked}
            onValueChange={setItChecked}
            trackColor={{ false: AppColors.border, true: AppColors.primary }}
            thumbColor={isChecked ? AppColors.textWhite : AppColors.borderLight}
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
    color: AppColors.textWhite,
  },
  text2: {
    fontSize: 16,
    color: AppColors.textWhite,
  },
  input: {
    fontSize: 18,
    width: '100%',
    borderColor: AppColors.border,
    borderWidth: 1,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    color: AppColors.textPrimary,
    backgroundColor: AppColors.backgroundCard,
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
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  labelError: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#ff375b',
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