import { useState, useCallback } from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Rodape from '../../Components/Rodape';
import api from '../services/api';

export default function TelaCadastroColmeia({ navigation, route }) {
  // Se a tela foi aberta sem parâmetros, considera que é um cadastro novo (0)
  const idcolmeia = route.params?.idcolmeia ?? 0;
  const editando = idcolmeia !== 0;

  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [capmax, setCapMax] = useState('');

  // Roda toda vez que a tela aparece (não só na primeira vez)
  useFocusEffect(
    useCallback(() => {
      if (editando) {
        buscarColmeia(idcolmeia);
      } else {
        limparCampos();
      }
    }, [idcolmeia])
  );

  async function buscarColmeia(codigo) {
    try {
      const { data } = await api.get(`/colmeia/${codigo}`);
      setNome(data.nome);
      setLocal(data.local);
      setCapMax(String(data.capmax));
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível carregar os dados da colmeia.');
    }
  }

  function limparCampos() {
    setNome('');
    setLocal('');
    setCapMax('');
  }

  async function salvarColmeia() {
    if (!nome.trim() || !local.trim() || !capmax.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    const colmeia = {
      nome: nome.trim(),
      local: local.trim(),
      capmax: Number(capmax),
    };

    try {
      if (editando) {
        await api.put(`/colmeia/${idcolmeia}`, colmeia);
        Alert.alert('Sucesso', 'Colmeia atualizada com sucesso!');
      } else {
        await api.post('/colmeia', colmeia);
        Alert.alert('Sucesso', 'Colmeia cadastrada com sucesso!');
      }
      navigation.navigate('TelaListagem');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar. Verifique se a API está ligada.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Text style={styles.text}>
            <MaterialCommunityIcons name="reorder-horizontal" size={35} color="black" />
            {editando ? 'Editar Colmeia' : 'Cadastro de Colmeia'}
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoInterno}>
        <Text style={styles.text2}>Preencha os dados de sua colmeia!</Text>

        <Text style={styles.tituloInput}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da colmeia"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.tituloInput}>Localização</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o local em que está a colmeia"
          value={local}
          onChangeText={setLocal}
        />

        <Text style={styles.tituloInput}>Capacidade Máxima</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a capacidade máxima da colmeia"
          value={capmax}
          keyboardType="numeric"
          onChangeText={setCapMax}
        />

        <Pressable style={styles.botao} onPress={salvarColmeia}>
          <MaterialCommunityIcons name="content-save" size={24} color="#fff" />
          <Text style={styles.textoBotao}> Salvar </Text>
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
  input: {
    width: '90%',
    height: 50,
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
    fontWeight: '600',
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botao: {
    width: 200,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    backgroundColor: '#402b2b',
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});