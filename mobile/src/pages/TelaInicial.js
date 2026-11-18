import {
  Pressable,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Rodape from '../../Components/Rodape';
import { useNavigation } from '@react-navigation/native';
import Botao from '../../Components/Botao';
export default function TelaInicial() {
  const navigation = useNavigation();

  function onPressFunction() {
    navigation.openDrawer();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Pressable onPress={onPressFunction}>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              name="reorder-horizontal"
              size={35}
              color="#black"
            />
            Início
          </Text>
        </Pressable>
      </View>
      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoInterno}>
        <Botao
          titulo="Nome do Usuário"
          cor="#402b2b"
          nomeIcone="account"
          corIcone="white"
        />
        <Botao
          titulo="Clima"
          cor="#402b2b"
          nomeIcone="cloud"
          corIcone="white"
        />
        <Botao
          titulo="Localização das colmeias"
          cor="#402b2b"
          nomeIcone="map"
          corIcone="white"
          onPress={() => alert('Em breve: mapa com a localização das colmeias!')}
        />
        <Botao
          titulo="Cadastro de colmeias"
          cor="#402b2b"
          nomeIcone="beehive-outline"
          corIcone="white"
          onPress={() => {
            navigation.navigate('TelaCadastroColmeia', { idcolmeia: 0 });
          }}
        />
        <Botao
          titulo="Saiba mais"
          cor="#402b2b"
          nomeIcone="information"
          corIcone="white"
          onPress={() => {
            navigation.navigate('Registros');
          }}
        />
        <Botao
          titulo="Listagem de Colmeias "
          cor="#402b2b"
          nomeIcone="account"
          corIcone="white"
          onPress={() => {
            navigation.navigate('TelaListagem');
          }}
        />
      </ScrollView>
      <Rodape />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'left',
    backgroundColor: '#F9E3AE',
  },
  topo: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
  },
  conteudo: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    flexDirection: 'column',
    flex: 1,
  },
    conteudoInterno: {
    alignItems: 'center',
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBotton: 10,
  },
});
