import { View, Text, Button, TextInput, StyleSheet, StatusBar, Switch, Image } from 'react-native';
import { useRouter, Link } from 'expo-router'; 
import React, {useState} from 'react';
import BotaoCustomizado from '../components/buttons';
import {LinearGradient} from 'expo-linear-gradient';


export default function telaLogin () {
    const router = useRouter();
    const [isChecked, setItChecked] = useState(false);


    return (
      <LinearGradient
        colors={["#9560e1", "#005c83"]} // 👈 cores do gradiente
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}>

          <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            {/* <Button title="Voltar" onPress={() => router.back()} /> */}

            
            <Image source={require("../assets/images/logotipo-coruja.png")} style={styles.img} />
            
            

            <Text style={styles.text}>Login</Text>

            <TextInput placeholder='seuemail@souunisuam.com.br'  placeholderTextColor="#7a7a8bff" style = {styles.input}  accessibilityLabel='Campo de e-mail'/>
            <TextInput placeholder='Insira sua senha'  placeholderTextColor="#7a7a8bff"   secureTextEntry={true} style={styles.input}  accessibilityLabel='Campo de senha' />


            <View style={styles.row}>
              <Switch
              value={isChecked}
              onValueChange={setItChecked}
              trackColor={{ false: "#767577", true: "#761fa8" }}
              thumbColor={isChecked ? "#fff" : "#f4f3f4"}
              accessible= {true}
              accessibilityLabel='Mantenha-me conectado'
              accessibilityHint="Ativa ou desativa se manter conectado no app"
              accessibilityState={{checked: isChecked}}
              />
              <Text style={styles.text2}>Mantenha-me conectado</Text>
            </View>

            <Link href="/cadastro" asChild>
              <BotaoCustomizado title='Entrar' onPress={()=> 'void'} />
            </Link>

            <Text style={styles.text2}>Você é novo por aqui?</Text>
            <Link href="/cadastro" asChild>
              <BotaoCustomizado title='Cadastre-se' onPress={()=> 'void'}/>
            </Link>
        
          </View>
        </LinearGradient>
    );
  }

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    padding: 10,
    },

  text: { 
    textAlign: 'left',
    fontSize: 30,
    marginBottom: 16,
    fontWeight: 800,
    // Faz com que o texto renha espaço o suficiente para obedecer os comandos de textAlign right, center e left
    width: '100%',
    color: '#FFF',
    },

    text2: {
      fontSize: 16,
      color: '#FFF',
    },

  input: {
    fontSize: 18,
    width: '100%',
    borderColor: '#b9b9b9ff',
    borderWidth: 1,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    color: '#242424ff',
    backgroundColor: '#FFF',
  },

  row: {
    flexDirection: "row", // 👈 coloca lado a lado
    alignItems: "center", // 👈 centraliza na vertical
    gap: 10, // se sua versão de RN suportar (ou use marginRight)
  },

  img: {
    alignSelf: 'center',
    width: 150, 
    height: 100,
  }
 
});