import BotaoCustomizado from '@/components/buttons';
import { Ionicons } from '@expo/vector-icons'; //Ícone de check
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { useSettings } from '../hooks/useSettings';


//Validações
const schema = yup.object({
  firstname: yup.string().required("Informe seu primeiro nome."),
  lastname: yup.string().required("Informe seu sobrenome."),
  email: yup.string().email("E-mail inválido!").required("Informe seu e-mail."),
  phone: yup.string().required("Informe seu telefone."),
  address: yup.string().required("Informe seu endereço."),
  password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos.").max(14, "Senha muito longa. Menos de 14 caracteres, por favor.").required("Informe sua senha."),
  //Criando uma comparação com o campo 'password'
  confirmpass: yup.string().oneOf([yup.ref('password')], "As senhas devem ser iguais.").required("Confirme sua senha.")
});


export default function telaCadastro() {
  const { colors, vibrate } = useSettings();
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();

  //Função de envio
  async function handleSignIn(data: any) {
    setLoading(true);

    try {
      // Simular cadastro bem-sucedido
      const userToken = 'token_' + Date.now(); // Token simulado
      const fullName = `${data.firstname} ${data.lastname}`;
      
      // Salvar dados do usuário no AsyncStorage
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userEmail', data.email);
      await AsyncStorage.setItem('userName', fullName);
      await AsyncStorage.setItem('userPhone', data.phone); // Telefone do formulário
      await AsyncStorage.setItem('userAddress', data.address); // Endereço do formulário
      
      setTimeout(() => {
        setLoading(false);
        reset(); //Limpa os campos primeiro
        setShowSuccess(true);
        
        // Redirecionar para o login após 3 segundos
        setTimeout(() => {
          router.replace('/login');
        }, 3000);
      }, 2000);
    } catch (error) {
      console.log('Erro ao fazer cadastro:', error);
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

        <Text style={styles.title}>Crie sua conta!</Text>

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            {/*Nome*/}
            <Controller control={control} name='firstname' render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={[styles.input, {
                borderWidth: errors.firstname && 1,
                borderColor: errors.firstname && colors.primary
              }]} onChangeText={onChange} 
              onBlur={onBlur}
              value={value}
              placeholder='Primeiro nome'
              placeholderTextColor="black" />
            )} />
            {errors.firstname && <Text style={styles.labelError}>{errors.firstname?.message}</Text>}
          </View>

          <View style={styles.inputContainer}>
            {/*Sobrenome*/}
            <Controller control={control} name='lastname' render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={[styles.input, {
                borderWidth: errors.lastname && 1,
                borderColor: errors.lastname && colors.primary
              }]} onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder='Sobrenome'
              placeholderTextColor="black" />
            )} />
            {errors.lastname && <Text style={styles.labelError}>{errors.lastname?.message}</Text>}
          </View>
        </View>

        {/*E-mail*/}
        <Controller control={control} name='email' render={({ field: {onChange, onBlur, value} }) => (
          <TextInput style={[styles.input, {
            borderWidth: errors.email && 1,
            borderColor: errors.email && colors.primary,
          }]} onChangeText={onChange} 
          onBlur={onBlur} //Chamado qunado o TextInput é tocado
          value={value} 
          placeholder='Digite seu e-mail'
          placeholderTextColor="black" />
        )} />
        {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

        {/*Telefone*/}
        <Controller control={control} name='phone' render={({ field: {onChange, onBlur, value} }) => (
          <TextInput style={[styles.input, {
            borderWidth: errors.phone && 1,
            borderColor: errors.phone && colors.primary,
          }]} onChangeText={onChange} 
          onBlur={onBlur}
          value={value} 
          placeholder='Digite seu telefone'
          placeholderTextColor="black" />
        )} />
        {errors.phone && <Text style={styles.labelError}>{errors.phone?.message}</Text>}

        {/*Endereço*/}
        <Controller control={control} name='address' render={({ field: {onChange, onBlur, value} }) => (
          <TextInput style={[styles.input, {
            borderWidth: errors.address && 1,
            borderColor: errors.address && colors.primary,
          }]} onChangeText={onChange} 
          onBlur={onBlur}
          value={value} 
          placeholder='Digite seu endereço'
          placeholderTextColor="black" />
        )} />
        {errors.address && <Text style={styles.labelError}>{errors.address?.message}</Text>}

        {/*Senha*/}
        <Controller control={control} name='password' render={({ field: {onChange, onBlur, value} }) => (
          <TextInput style={[styles.input, {
            borderWidth: errors.password && 1,
            borderColor: errors.password && colors.primary,
          }]} onChangeText={onChange} 
          onBlur={onBlur} //Chamado qunado o TextInput é tocado
          value={value} 
          placeholder='Crie uma senha'
          placeholderTextColor="black"
          secureTextEntry={true} />
        )} />
        {errors.password && <Text style={styles.labelError}>{errors.password?.message}</Text>}

        {/*Confirmação senha*/}
        <Controller control={control} name='confirmpass' render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.input, {
            borderWidth: errors.confirmpass && 1,
            borderColor: errors.confirmpass && colors.primary,
          }]} onChangeText={onChange} 
          onBlur={onBlur}
          value={value}
          placeholder='Confirme a senha'
          placeholderTextColor="black"
          secureTextEntry={true} />
        )} />
        {errors.confirmpass && <Text style={styles.labelError}>{errors.confirmpass?.message}</Text>}

        {/*Botão 'Acessar'*/}
        <TouchableOpacity style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleSubmit(handleSignIn)}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar conta</Text>
          )}
        </TouchableOpacity>

        {/*Botão 'Voltar'*/}
        <BotaoCustomizado title="Voltar" onPress={() => router.back()} />

        {/*Modal de confirmação de cadastro*/}
        <Modal visible={showSuccess} animationType="fade" transparent onRequestClose={() => setShowSuccess(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Ionicons name='checkmark-circle' size={100}marginBottom={15} color={colors.primary}/>

              <Text style={styles.modalText}>Conta criada com sucesso!</Text>
              <Text style={styles.modalSubtext}>Você será redirecionado para o login em alguns segundos...</Text>

              <TouchableOpacity style={styles.modalButton} onPress={() => { setShowSuccess(false); router.replace('/login');}}>
                <Text style={styles.modalButtonText}>Ir para Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  img: {
    alignSelf: 'center',
    width: 150, 
    height: 100,
    bottom: 50,
  },
  title: {
    fontSize: 34,
    marginBottom: 34,
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10, //Espaçamento moderno entre os dois blocos
  },
  inputContainer: {
    flex: 1, //Divide igualmente o espaço
  },
  input: {
    color: 'black',
    backgroundColor: '#CFD9E3',
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 8,
    width: '100%',
    height: 40,
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: 'rgba(126, 87, 194, 1.00)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0 , 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 25,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 13,
  },
  modalSubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#4900EB',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 90,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});