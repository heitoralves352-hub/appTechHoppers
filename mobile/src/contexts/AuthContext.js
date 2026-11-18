import { createContext, useContext, useState } from 'react';

// O "contexto" guarda informações que várias telas precisam acessar.
// Aqui ele guarda quem está logado e as funções de entrar e sair.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null); // null = ninguém logado

  function entrar(perfil, senha) {
    // ATENÇÃO: em um app de verdade, quem confere o usuário e a senha é a API.
    if (perfil === 'TechHoppers' && senha === 'teste123') {
      setUsuario({ nome: perfil });
      return true;
    }
    return false;
  }

  function sair() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

// Atalho para usar o contexto nas telas: const { usuario, entrar, sair } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}