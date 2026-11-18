// Importar o arquivo com as rotas
import Routes from "./src/routes/Routes";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TelaInicial from "./src/pages/TelaInicial";
import SettingsScreen from './src/pages/SettingsScreen';

const App = () => {

 return (
   <Routes />
  );
  
  // Carregar o arquivo de rotas
}


export default App;

