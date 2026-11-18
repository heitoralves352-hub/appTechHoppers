import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../contexts/AuthContext';

import Capa from '../pages/Capa';
import TelaAutenticacao from '../pages/TelaAutenticacao';
import TelaInicial from '../pages/TelaInicial';
import Registros from '../pages/Registros';
import TelaCadastroColmeia from '../pages/TelaCadastroColmeia';
import TelaListagem from '../pages/TelaListagem';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Telas de quem NÃO está logado: capa e login (sem menu lateral)
function RotasPublicas() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Capa" component={Capa} />
      <Stack.Screen name="TelaAutenticacao" component={TelaAutenticacao} />
    </Stack.Navigator>
  );
}

// Conteúdo do menu lateral: as telas + o botão "Sair"
function MenuLateral(props) {
  const { sair } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="logout" color={color} size={size} />
        )}
        onPress={sair}
      />
    </DrawerContentScrollView>
  );
}

// Telas de quem ESTÁ logado (com menu lateral)
function RotasPrivadas() {
  return (
    <Drawer.Navigator
      initialRouteName="TelaInicial"
      drawerContent={(props) => <MenuLateral {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#402b2b',
        drawerActiveBackgroundColor: '#F9E3AE',
      }}
    >
      <Drawer.Screen
        name="TelaInicial"
        component={TelaInicial}
        options={{
          drawerLabel: 'Início',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="TelaListagem"
        component={TelaListagem}
        options={{
          drawerLabel: 'Minhas colmeias',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="beehive-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Registros"
        component={Registros}
        options={{
          drawerLabel: 'Saiba mais',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" color={color} size={size} />
          ),
        }}
      />
      {/* Existe, mas não aparece no menu: é aberta pelos botões das outras telas */}
      <Drawer.Screen
        name="TelaCadastroColmeia"
        component={TelaCadastroColmeia}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}

export default function Routes() {
  const { usuario } = useAuth();

  return (
    <NavigationContainer>
      {usuario ? <RotasPrivadas /> : <RotasPublicas />}
    </NavigationContainer>
  );
}