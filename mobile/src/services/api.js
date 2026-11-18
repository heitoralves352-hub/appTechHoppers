import axios from 'axios';

// Endereço da API (pasta server).
// Troque pelo IP do seu computador: use o comando "ipconfig" e veja o "Endereço IPv4".
const api = axios.create({
  baseURL: 'http://192.168.1.6:3333',
});

export default api;