// Gerenciar a navegação, atua como o contêiner na pilha de telas
import { NavigationContainer } from '@react-navigation/native';

// Gerenciar a navegação entre as telas
import { createDrawerNavigator } from '@react-navigation/drawer';

// Configuração e gestão da navegação entre as telas
const Drawer = createDrawerNavigator();

// Importar as páginas
import Capa from '../pages/Capa';
import TelaAutenticacao from '../pages/TelaAutenticacao';
import TelaInicial from '../pages/TelaInicial';
import Registros from '../pages/Registros';
import TelaCadastroColmeia from '../pages/TelaCadastroColmeia';
import TelaListagem from '../pages/TelaListagem';
// Criar e exportar a função com as rotas
export default function Routes() {
  return (
    // Agrupar as rotas
    <NavigationContainer>
      {/* Criar uma pilha de páginas */}
      <Drawer.Navigator>
        {/* Carregar a tela listar usuários */}
        <Drawer.Screen
          name="Capa"
          component={Capa}
          // options={{ headerTitle: "Listar Usuários"}}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="TelaAutenticacao"
          component={TelaAutenticacao}
          // options={{ headerTitle: "Listar Usuários"}}
          options={{ headerShown: false, drawerLabel: 'Cadastre-se' }}
        />

        <Drawer.Screen
          name="TelaInicial"
          component={TelaInicial}
          options={{ headerShown: false, drawerLabel: 'Home' }}
        />

        <Drawer.Screen
          name="Registros"
          component={Registros}
          options={{ headerShown: false, drawerLabel: 'Saiba Mais' }}
        />
        <Drawer.Screen
          name="TelaCadastroColmeia"
          component={TelaCadastroColmeia}
          options={{ headerShown: false, drawerLabel: 'TelaCadastroColmeia' }}
        />
        <Drawer.Screen
          name="TelaListagem"
          component={TelaListagem}
          options={{ headerShown: false, drawerLabel: 'TelaListagem' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
