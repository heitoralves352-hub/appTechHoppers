// Incluir a função navegar entre as telas
 import { useNavigation } from "@react-navigation/native";
import { Pressable, View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 import Botao from '../../Components/Botao';


export default function Capa() {
  // Navegar entre as telas
  const navigation = useNavigation();

  function imprimir(){
    alert('Olá Mundo');
  }
 
 return (
   
    <SafeAreaView style={styles.container}>
      <View style={styles.regiaoImagem}>
        <Image style={styles.imagem} source={require('../../assets/snack-icon.png')} />
      </View>

      <View style={styles.regiaoBotao}>
           <Botao
            titulo="Cadastre-se"
            cor="#402b2b"
            onPress={()=>{navigation.navigate ('TelaAutenticacao')}}/>
          </View>
      </SafeAreaView>
  );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  regiaoImagem: {
    flex:1,
    backgroundColor: '#F9E3AE',
    alignItems: 'center',
  },
  regiaoBotao: {
    height:200,
    flexDirection: 'row',
    backgroundColor: '#F9E3AE',
    justifyContent: 'center',
    alignItems: '',
  },
  imagem: {
    height: 400,
    width: 400,
    marginVertical:40,
  }
  
  
  
});