import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Rodape from '../../Components/Rodape';
import api from '../services/api';

export default function TelaListagem({ navigation }) {
  const [colmeias, setColmeias] = useState([]);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function listarColmeias() {
    setCarregando(true);
    try {
      const { data } = await api.get('/colmeias');
      setColmeias(data);
      setErro('');
    } catch (err) {
      setErro('Não foi possível carregar as colmeias. Verifique se a API está ligada.');
    } finally {
      setCarregando(false);
    }
  }

  // Recarrega a lista sempre que a tela aparece (ex.: ao voltar do cadastro)
  useFocusEffect(
    useCallback(() => {
      listarColmeias();
    }, [])
  );

  function excluirColmeia(id) {
    Alert.alert('Confirmação', `Deseja realmente excluir a colmeia ${id}?`, [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/colmeia/${id}`);   // espera a API terminar...
            await listarColmeias();               // ...e só depois recarrega a lista
            Alert.alert('Colmeia excluída com sucesso!');
          } catch (err) {
            Alert.alert('Erro', 'Não foi possível excluir a colmeia.');
          }
        },
      },
    ]);
  }

  function editarColmeia(id) {
    navigation.navigate('TelaCadastroColmeia', { idcolmeia: id });
  }

  function novaColmeia() {
    navigation.navigate('TelaCadastroColmeia', { idcolmeia: 0 });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Text style={styles.text}>
            <MaterialCommunityIcons name="reorder-horizontal" size={35} color="black" />
            Listagem de Colmeias
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoInterno}>
        <Text style={styles.text2}>
          Aqui está a sua lista de colmeias! Atualize ou exclua os seus dados.
        </Text>

        {carregando && <ActivityIndicator size="large" color="#402b2b" />}

        {erro !== '' && <Text style={styles.textoErro}>{erro}</Text>}

        {!carregando && erro === '' && colmeias.length === 0 && (
          <Text style={styles.textoVazio}>Nenhuma colmeia cadastrada ainda.</Text>
        )}

        <View style={styles.viewList}>
          {colmeias.map((colmeia) => (
            <View key={colmeia.id} style={styles.viewCard}>
              <View style={styles.viewCodigo}>
                <Text style={styles.textCard}>{colmeia.id}</Text>
              </View>
              <View style={styles.viewNome}>
                <Text style={styles.textCard}>{colmeia.nome}</Text>
              </View>
              <View style={styles.viewButtons}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => editarColmeia(colmeia.id)}>
                  <Icon name="edit" size={24} color="#22AA55" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => excluirColmeia(colmeia.id)}>
                  <Icon name="trash" size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <Pressable style={styles.botao} onPress={novaColmeia}>
          <Text style={styles.text3}>Cadastrar Colmeia</Text>
        </Pressable>
      </ScrollView>

      <Rodape />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9E3AE',
  },
  topo: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  conteudo: {
    borderTopColor: 'black',
    borderTopWidth: 1,
    flex: 1,
  },
  conteudoInterno: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  text3: {
    fontSize: 22,
    color: 'white',
  },
  textoErro: {
    color: '#B00020',
    fontSize: 16,
    marginHorizontal: 20,
    textAlign: 'center',
  },
  textoVazio: {
    fontSize: 16,
    color: '#402b2b',
  },
  viewList: {
    width: '100%',
  },
  botao: {
    width: 300,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#402b2b',
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