import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Rodape from '../../Components/Rodape';

// Os dados ficam numa lista separada do visual.
// Para adicionar um sensor novo, é só incluir mais um item aqui.
const SENSORES = [
  {
    icone: 'thermometer',
    titulo: 'Umidade e temperatura',
    descricao:
      'Sensor com saída digital e leituras estáveis. Controla a umidade e a temperatura dentro da colmeia.',
  },
  {
    icone: 'axis-arrow',
    titulo: 'Acelerômetro e giroscópio (MPU-6050)',
    descricao:
      'Mede movimento e inclinação. Na colmeia, avisa se a caixa foi inclinada ou mexida.',
  },
  {
    icone: 'scale-balance',
    titulo: 'Sensor de peso (balança)',
    descricao:
      'Acompanha o peso da produção das abelhas, como o mel e outros insumos. Feito em metal resistente.',
  },
  {
    icone: 'signal-distance-variant',
    titulo: 'Sensor de distância ultrassônico',
    descricao:
      'Emite ondas sonoras de alta frequência e mede o tempo que elas levam para voltar, calculando a distância até um objeto.',
  },
];

export default function Registros() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Pressable style={styles.botaoMenu} onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="reorder-horizontal" size={32} color="#402b2b" />
        </Pressable>
        <Text style={styles.tituloTopo}>Saiba mais</Text>
      </View>

      <ScrollView style={styles.conteudo} contentContainerStyle={styles.conteudoInterno}>
        <View style={styles.introducao}>
          <MaterialCommunityIcons name="beehive-outline" size={48} color="#402b2b" />
          <Text style={styles.tituloIntro}>Colmeia inteligente</Text>
          <Text style={styles.textoIntro}>
            Cada colmeia pode receber sensores que acompanham a saúde das abelhas e a
            produção de mel. Conheça cada um deles:
          </Text>
        </View>

        {SENSORES.map((sensor) => (
          <View key={sensor.titulo} style={styles.card}>
            <View style={styles.circuloIcone}>
              <MaterialCommunityIcons name={sensor.icone} size={28} color="#F9E3AE" />
            </View>
            <View style={styles.textosCard}>
              <Text style={styles.tituloCard}>{sensor.titulo}</Text>
              <Text style={styles.descricaoCard}>{sensor.descricao}</Text>
            </View>
          </View>
        ))}
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
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  botaoMenu: {
    marginRight: 8,
  },
  tituloTopo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#402b2b',
  },
  conteudo: {
    flex: 1,
    borderTopColor: '#402b2b',
    borderTopWidth: 1,
  },
  conteudoInterno: {
    padding: 16,
    gap: 14,
  },
  introducao: {
    alignItems: 'center',
    marginBottom: 6,
  },
  tituloIntro: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#402b2b',
    marginTop: 6,
  },
  textoIntro: {
    fontSize: 15,
    color: '#5c4033',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 21,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    // sombra (iPhone)
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    // sombra (Android)
    elevation: 3,
  },
  circuloIcone: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#402b2b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textosCard: {
    flex: 1,
  },
  tituloCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#402b2b',
    marginBottom: 4,
  },
  descricaoCard: {
    fontSize: 14,
    color: '#5c4033',
    lineHeight: 20,
  },
});