import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoCustomizado from '../components/buttons';
import { AppColors } from '../constants/theme';


export default function telaLogin () {
    const router = useRouter();
    const [isChecked, setItChecked] = useState(false);
    const insets = useSafeAreaInsets();

    return (
      <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <LinearGradient
          colors={['#9560e1', '#005c83']}
          style={styles.container}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}>

            <View style={styles.content}>
              
              <Image source={require("../assets/images/logotipo-coruja.png")} style={styles.img} />
              
              <Text style={styles.text}>Login</Text>

              <TextInput placeholder='seuemail@souunisuam.com.br'  placeholderTextColor={AppColors.textLight} style = {styles.input}  accessibilityLabel='Campo de e-mail'/>
              <TextInput placeholder='Insira sua senha'  placeholderTextColor={AppColors.textLight}   secureTextEntry={true} style={styles.input}  accessibilityLabel='Campo de senha' />

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

              <Link href="/cadastro" asChild>
                <BotaoCustomizado title='Entrar' onPress={()=> 'void'} />
              </Link>

              <Text style={styles.text2}>Você é novo por aqui?</Text>
              <Link href="/cadastro" asChild>
                <BotaoCustomizado title='Cadastre-se' onPress={()=> 'void'}/>
              </Link>
          
            </View>
          </LinearGradient>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.primary,
  },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
    gap: 10,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  img: {
    alignSelf: 'center',
    width: 150, 
    height: 100,
  }
});