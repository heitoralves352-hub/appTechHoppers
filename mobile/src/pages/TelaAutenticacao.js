// Incluir a função navegar entre as telas
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native';
import Botao from '../../Components/Botao';

export default function TelaAutenticacao() {
  // Navegar entre as telas
  const navigation = useNavigation();

  function confirmar() {
    if (perfil == 'TechHoppers' && senha=='teste123') {
      navigation.navigate('TelaInicial');
    }  else {
         alert('Usuário ou senha incorreta');
    }
  }

  function imprimir() {
    alert('Olá Mundo');
  }

  const [perfil, onChangePerfil] = useState('');
  const [senha, onChangeSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.regiaotitulo}>
        <Image
          style={styles.imagem}
          source={require('../../assets/BemVindo.png')}
        />
      </View>
      <View style={styles.conteudo}>
        <Text style={styles.tituloInput}>Perfil</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePerfil}
          value={perfil}
          placeholder="perfil"
          keyboardType=""
        />
        <Text style={styles.tituloInput}>Senha</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSenha}
          value={senha}
          placeholder="senha"
          keyboardType="password"
        
        />

        <Botao
          titulo="Confirmar"
          cor="#402b2b"
           onPress={() => confirmar()}
          
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9E3AE',
  },
  regiaotitulo: {    
    backgroundColor: '#F9E3AE',
    alignItems: 'center',
    height: 350
  },
  conteudo: {
    backgroundColor: '#F9E3AE',
    padding: 5,
    alignItems: 'center'
  },
  input: {
    height: 50,
    width: '90%',
    paddingLeft: 10,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
    opacity: 0.7,
  },
  tituloInput: {
    marginBottom: 5,
    marginTop: 5,
    color: '#402b2b',
    fontWeight: 600,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  imagem: {
    height: 300,
    width: 400,
  },
});
