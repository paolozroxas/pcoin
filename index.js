import Blockchain from './blockchain';

import Express from 'express';
import bodyParser from 'body-parser';

const app = Express();
const port = 3000;

const bc = new Blockchain();

app.use(bodyParser.send());

app.get('/', (req, res) => {
  res.send('Welcome to PCoin')
});

app.get('/get_chain', (req, res) => {
  res.send(bc.chain);
});

app.get('/get_last_block', (req, res) => {
  res.send(bc.getLastBlock());
})

app.post('/mine_block', (req, res) => {
  const data = res.body;

});

