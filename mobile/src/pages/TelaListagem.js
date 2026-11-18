import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Pressable,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Rodape from '../../Components/Rodape';
import axios from 'axios';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
axios.defaults.baseURL = 'http://192.168.43.173:3333';

export default function TelaListagem({ navigation }: { navigation: any }) {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(true);

  const listarComeias = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/colmeias');
      setResponse(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    function onPressFunction() {
    navigation.openDrawer();
  }


  useEffect(() => {
    navigation.addListener('focus', () => {
      setLoad(!load);
    });
    listarComeias();
  }, [load, navigation]);

  function proximaTela() {
    navigation.navigate('TelaCadastro', { idcolmeia: 0 });
  }

  function excluirProduto(id: number) {
    Alert.alert('Confirmação', `Deseja realmente excluir a colmeia id ${id}`, [
      {
        text: 'Sim',
        onPress: () => {
          axios.delete(`colmeia/${id}`);
          setLoad(!load);
          Alert.alert('Colmeia excluída com sucesso!');
        },
        style: 'default',
      },
      {
        text: 'Não',
        style: 'default',
      },
    ]);
  }

  function editarProduto(id: number) {
    navigation.navigate('TelaCadastroColmeia', { idcolmeia: id });
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
            Listagem de Colmeias
          </Text>
        </Pressable>
      </View>



      <ScrollView style={styles.conteudo}>
      <Text style={styles.text2}>Aqui está a sua lista de colmeias!!!
      Atualize ou Exclua os seus dados.
      </Text>
      <View style={styles.conteudo}>
      <StatusBar />
      <View style={styles.viewList}>
        {response.map((colmeia) => (
          <View style={styles.viewCard}>
            <View style={styles.viewCodigo}>
              <Text style={styles.textCard}>{colmeia.id}</Text>
            </View>
            <View style={styles.viewNome}>
              <Text style={styles.textCard}>{colmeia.nome}</Text>
            </View>
            <View style={styles.viewButtons}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => editarProduto(colmeia.id)}>
                <Icon name="edit" size={24} color={'#22FF55'} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => excluirProduto(colmeia.id)}>
                <Icon name="trash" size={24} color={'#FF0000'} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

  <Pressable
        style={[{ backgroundColor: '#402b2b' }, styles.botao]}
        onPress={() => {
          navigation.navigate('TelaCadastroColmeia', { idcolmeia: 0 });
        }}>
        <Text style={styles.text3}>Cadastrar Colmeia</Text>
      </Pressable>
    </View>

      
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
    alignItems: 'center',
    borderTopColor: '#black',
    borderTopWidth: 1,
    flexDirection: 'column',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBotton: 16,
  },
  text3: {
    fontSize: 22,
    fontWeight: '',
    marginBotton: 10,
    color: 'white',
  },
  text2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBotton: 20,
    marginLeft:20,
  },
  botao: {
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    paddingLeft: 5,
    marginVertical: 20,
  },
  viewCard: {
    backgroundColor: '#FFFFFF',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 2,
  },
  viewCodigo: {
    alignItems: 'center',
    width: '10%',
  },
  viewNome: {
    width: '65%',
  },
  textCard: {
    fontSize: 18,
  },
  viewButtons: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
