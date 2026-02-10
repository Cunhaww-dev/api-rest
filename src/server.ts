/**
 * Express, do jeitinho simples:
 1) importamos a lib e criamos a app com express()
 2) declaramos rotas GET com params dinamicos (:id, :user)
 3) o Express pega esses params e joga em request.params
4) por fim, ligamos o servidor na porta
 */
import express from 'express';

const PORT = 3333; // Definindo a porta para o servidor
const app = express(); // Inicializando o express
app.use(express.json()); // Dizendo que vamos usar o JSON para representar dados no body da requisição

// Recuperando um único parametro dinamico na rota
app.get('/products/:id', (request, response) => {
  // Express lida com facilidade com rotas
  const { id } = request.params; // Pegando o id do produto pelo parametro da rota (req.params)

  response.send(`Produto ${id}`);
});

// Recuperando parametros dinamicos na rota
app.get('/products/:id/:user', (request, response) => {
  // Express lida com facilidade com rotas
  const { id, user } = request.params; // Pegando o id e o user do produto pelo parametro da rota (req.params)

  response.send(`Produto ${id} do usuario ${user}`);
});

// Recuperando parametros não nomeados Query params
app.get('/products', (request, response) => {
  const { page, limit } = request.query; // Pegando os query params da rota (req.query)
  response.send(`Página ${page} de ${limit}`); //http://localhost:3333/products?page=1&limit=10
});

// Enviar dados com o body da requisição
app.post('/products', (request, response) => {
  const { name, price } = request.body; // Pegando os dados do body da requisição (req.body)
  // response.send(`Produto ${name} custa $ ${price}`); // content-type text/plain
  response.status(201).json({ name, price }); // Enviando os dados de volta como JSON Garante o content-type application/json e converte o objeto para JSON automaticamente
});

app.listen(PORT, () => {
  // Porta com funcao de callback
  console.log(`Server is running on port ${PORT}`);
});
