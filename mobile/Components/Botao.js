import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Botao({titulo, cor, nomeIcone, corIcone, ...rest}) { 
  return (
    <View style={styles.container}>      
      <Pressable style={[styles.botao, {backgroundColor: cor}]} {...rest}>
        <MaterialCommunityIcons name={nomeIcone} size={24} color={corIcone} />
        <Text style={styles.textoBotao}> {titulo} </Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    width:300,
  },
  botao: {
    height: 60,
    backgroundColor: '#9f9f9f',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    marginVertical: 15,
    flexDirection: 'row'
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: 600,
    color: '#fff',
  },
});
