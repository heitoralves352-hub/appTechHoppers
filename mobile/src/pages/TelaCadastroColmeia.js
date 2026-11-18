import { useState, useEffect } from 'react';
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
import { TextInput } from 'react-native';

import api from '../services/api'; 

export default function TelaCadastroColmeia({
  navigation,
  route,
}: {
  navigation: any,
  route: any,
}) {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [capmax, setCapMax] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    async function buscarColmeia(codigo: number) {
      try {
        const response = await api.get(`/colmeia/${codigo}`);
        setId(response.data.id);
        setNome(response.data.nome);
        setLocal(response.data.local);
        setCapMax(response.data.capmax);
      } catch (err) {
        console.log(err);
      }
    }

    const codigo = route.params.idcolmeia;

    if (codigo != 0) 
      buscarColmeia(codigo);
  }, []);

  async function cadastrarProduto() {
    const colmeia = {
      nome,
      local,
      capmax,
    };

    try {
      if (route.params.idcolmeia == 0) {
        await api.post('/colmeia', colmeia);
        alert('Produto Salvo com Sucesso!!!');
      } else {
        await api.put(`/colmeia/${route.params.idcolmeia}`, colmeia);
        alert('Produto Atualizado com Sucesso!!!');
      }
    } catch (err) {
      console.log(err);
    }

    navigation.navigate('TelaInicial');
  }

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
            Cadastro de Colmeia
          </Text>
        </Pressable>
      </View>
      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoInterno}>
        <Text style={styles.text2}>Preencha os dados de sua colmeia!</Text>

        <Text style={styles.tituloInput}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do produto"
          defaultValue={nome}
          keyboardType="default"
          onChangeText={(valor) => setNome(String(valor))}
        />
        <Text style={styles.tituloInput}>Localização</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o local em que está a colmeia"
          defaultValue={local}
          keyboardType="default"
          onChangeText={(valor) => setLocal(String(valor))}
        />
        <Text style={styles.tituloInput}>Capacidade Máxima</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a capacidade máxima da colmeia"
          defaultValue={capmax}
          keyboardType="default"
          onChangeText={(valor) => setCapMax(Number(valor))}
        />
        <Text style={styles.tituloInput}>Identificação</Text>
        <TextInput
          style={styles.input}
          defaultValue={id}
          placeholder="id"
          keyboardType="numeric"
          onChangeText={(valor) => setId(Number(valor))}
        />
        <Pressable
        style={[styles.botao, { backgroundColor: '#402b2b' }]}
        onPress={() => cadastrarProduto()}>
        <MaterialCommunityIcons name={'content-save'} size={24} color={'#fff'} />
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

  input: {
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
    fontWeight: 600,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },

  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBotton: 10,
  },
  text2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBotton: 10,
  },
  text3: {
    fontSize: 22,
    fontWeight: '',
    marginBotton: 10,
    color: 'white',
  },
  botao: {
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
    paddingLeft: 5,
    marginVertical: 30,
  },

  textoBotao: {
    fontSize: 20,
    fontWeight: 600,
    color: '#fff',
  },
});
