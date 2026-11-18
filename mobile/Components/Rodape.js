import { View, StyleSheet } from 'react-native';
import { Pressable, Text, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";



export default function Rodape() { 

   const navigation = useNavigation();
   
  return (
    <View style={styles.container}>
     <Pressable onPress={() => navigation.navigate('TelaInicial')} style={[{backgroundColor: '#black'}, styles.botaorodape]}>
          <MaterialCommunityIcons name="home" size={20} color="#black" />
          <Text style={styles.textorodape}>
            Home
          </Text>
        </Pressable>        
         <Pressable   onPress={() => navigation.navigate('Capa')} style={[{backgroundColor: '#black'}, styles.botaorodape]}>
          <MaterialCommunityIcons name="keyboard-backspace" size={20} color="#black" />
          <Text style={styles.textorodape}>
            Sair
          </Text>
        </Pressable>  
    </View>
  );
}


const styles = StyleSheet.create({
 container: {
   flexDirection: 'row',
    backgroundColor: '#F9E3AE',
    height:50,
    borderTopColor: "#black",
    borderTopWidth:1,
    marginHorizontal:20,
    justifyContent: 'space-evenly'
  },
  botaorodape: {
    width: 50,
    height: 40,
    backgroundColor: '#F9E3AE',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  textorodape: {
    marginLeft: 2,
    fontSize: 10,
    fontWeight: 600,
    color: '#black',
  },
});
