import express from 'express';
import routes from './routes';

const app = express();
const PORTA = 3333;

app.use(express.json());
app.use(routes);

app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}`);
});