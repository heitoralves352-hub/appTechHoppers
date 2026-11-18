import { Pressable, View, Text, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Rodape from '../../Components/Rodape';
import { useNavigation } from '@react-navigation/native'
export default function TelaInicial() {
  const navigation = useNavigation();

  function onPressFunction(){
    navigation.openDrawer();
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.topo}>
      <Pressable onPress={onPressFunction}>
       <Text style={styles.text}>
       <MaterialCommunityIcons name="reorder-horizontal" size={35} color="#black" />
       Saiba Mais
       </Text>
      </Pressable>
    </View>

     <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoInterno}>
       <Text style={styles.text}>
        Informações sobre os sensores:
       </Text>

          <Pressable
          style={[{ backgroundColor: '#402b2b' }, styles.botao]}
          >
         <Text style={styles.texttitulo}>
        <MaterialCommunityIcons name="thermometer" size={25} color="#white" />
          Módulo sensor de Umidade e Temperatura:
          </Text>
          <Text style={styles.textconteudo}>
          Esse aparelho possui saída de sinal digital, além de fornecer dados confiáveis e estáveis.
         Sua função é controlar a umidade e temperatura interna da colmeia.
       </Text>
        </Pressable>

        <Pressable
          style={[{ backgroundColor: '#402b2b' }, styles.botao]}
          >
         <Text style={styles.texttitulo}>
        <MaterialCommunityIcons name="motion-sensor" size={25} color="#white" />
         Acelerômetro e giroscópio(MPU-6050):
          </Text>
          <Text style={styles.textconteudo}>
          Mede a variação da velocidade de um objeto.Consegue medir as forças resultantes
          do movimento (aceleração linear) e da gravidade.
          Em nossa colmeia é usada para ver a inclinação.
       </Text>
        </Pressable>
         <Pressable
          style={[{ backgroundColor: '#402b2b' }, styles.botao]}
          >
         <Text style={styles.texttitulo}>
        <MaterialCommunityIcons name="scale-bathroom" size={25} color="#white" />
         Sensor de peso(Balança): 
          </Text>
          <Text style={styles.textconteudo}>
          Utilizado para monitorar o peso da produção das abelhas, não apenas mel
           como outros insumos. Fabricado em metal resistente e a tensão de saída varia conforme o peso.

       </Text>
        </Pressable>
        <Pressable
          style={[{ backgroundColor: '#402b2b' }, styles.botao]}
          >
         <Text style={styles.texttitulo}>
        <MaterialCommunityIcons name="signal-distance-variant" size={25} color="#white" />
         Módulo de Sensor de Distância Ultrassônico:
          </Text>
          <Text style={styles.textconteudo}>
           Mede a distância entre ele e um objeto ao emitir ondas sonoras alta frequência (ultrassônicas)
          e medir o tempo que leva para essas ondas retornarem após refletirem no objeto.

       </Text>
        </Pressable>
   </ScrollView>
    <Rodape />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "left",
    justifyContent: "left",
    backgroundColor: '#F9E3AE',
  },
  topo: {
   height:50,
     flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
  },
  conteudo: {
    borderTopColor: "black",
    borderTopWidth:1,
    flexDirection:'column',
    flex: 1,
  },
    conteudoInterno: {
    alignItems: 'center',
  },
 
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color:'402b2b',
    marginLeft:10,
  },
  textconteudo: {
    fontSize: 7,
    textAlign:'center',
    color:'white',
  },
  texttitulo: {
    fontSize: 9,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
  },
   botao: {
    width: 400,
    height: 120,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingLeft: 5,
    marginVertical: 8,
   },
});