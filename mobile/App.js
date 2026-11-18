// Precisa ser o primeiro import do app (exigência do menu lateral)
import 'react-native-gesture-handler';
import { AuthProvider } from './src/contexts/AuthContext';
import Routes from './src/routes/Routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}