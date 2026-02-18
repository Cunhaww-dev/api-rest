/**
 * Express, do jeitinho simples:
 1) importamos a lib e criamos a app com express()
 2) declaramos rotas GET com params dinamicos (:id, :user)
 3) o Express pega esses params e joga em request.params
4) por fim, ligamos o servidor na porta
 */
import express from 'express';
import { routes } from './routes/index'; // Importando as rotas do arquivo index.ts
// import { myMiddleware } from './middlewares/my-middleware';
import type { NextFunction, Request, Response } from 'express';
import { AppError } from './utils/app-error';
import { ZodError } from 'zod';

const PORT = 3333; // Definindo a porta para o servidor
const app = express(); // Inicializando o express
app.use(express.json()); // Dizendo que vamos usar o JSON para representar dados no body da requisição
// app.use(myMiddleware); // Usando o middleware em todas as rotas (Global, deve ser aplicado antes das rotas)

app.use(routes); // Usando as rotas do arquivo index.ts

// SEMPRE antes de listen fizemos o tratamento da exceção, ela vai no final de tudo para ser capaz de capturar as exceções que podem ocorrer nas rotas, middlewares etc

// 400 Bad request - Client
// 500 Internaç server error - Server

// QUalquer erro da aplicação passa por aqui e a gente tem a oportunidade de tratar esse erro e enviar uma resposta mais amigável para o cliente, ou seja, para o usuário da nossa API, e também para evitar que erros do servidor sejam expostos para o cliente, o que pode ser um risco de segurança. Por exemplo, se um erro do servidor for exposto para o cliente, ele pode conter informações sensíveis sobre a estrutura do nosso código, banco de dados etc, o que pode ser explorado por atacantes. Portanto, é importante tratar os erros de forma adequada e enviar respostas apropriadas para o cliente.
app.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    // Verifica se o erro (error) é instancia/foi gerado pela classe AppError
    // se for um erro de AppError então é um erro lançado por nós, enviamos para o cliente uma mensagem mais detalhada, porém quando não é erro de AppError então ´não fomos nós que lançamos portanto é um erro do servidor.
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof ZodError) {
      response.status(400).json({
        message:
          'Validation error! Check the issues property for more details.',
        issues: error.format(), // O método format() do ZodError formata os erros de validação de uma maneira mais legível e estruturada, facilitando a identificação dos problemas de validação nos dados de entrada.
      });
    }

    response.status(500).json({ message: error.message });
  },
);

// // Recuperando um único parametro dinamico na rota
// app.get('/products/:id', (request, response) => {
//   // Express lida com facilidade com rotas
//   const { id } = request.params; // Pegando o id do produto pelo parametro da rota (req.params)

//   response.send(`Produto ${id}`);
// });

// // Recuperando parametros dinamicos na rota
// app.get('/products/:id/:user', (request, response) => {
//   // Express lida com facilidade com rotas
//   const { id, user } = request.params; // Pegando o id e o user do produto pelo parametro da rota (req.params)

//   response.send(`Produto ${id} do usuario ${user}`);
// });

// // Recuperando parametros não nomeados Query params
// app.get('/products', (request, response) => {
//   const { page, limit } = request.query; // Pegando os query params da rota (req.query)
//   response.send(`Página ${page} de ${limit}`); //http://localhost:3333/products?page=1&limit=10
// });

// // Enviar dados com o body da requisição
// // Middleware local em uma rota específica, ou seja, o middleware só vai ser executado quando a rota POST /products for chamada
// app.post('/products', myMiddleware, (request, response) => {
//   // o next de dentro do middleware sabe qual é a próxima função, ou seja, a função de callback da rota POST /products
//   const { name, price } = request.body; // Pegando os dados do body da requisição (req.body)
//   // response.send(`Produto ${name} custa $ ${price}`); // content-type text/plain
//   response.status(201).json({ name, price, user_id: request.user_id }); // Enviando os dados de volta como JSON Garante o content-type application/json e converte o objeto para JSON automaticamente
//   // user_id é o tipo que adicionamos no arquivo .d.ts, e que foi adicionado ao objeto request dentro do middleware, ou seja, ele pode ser acessado em qualquer rota que use esse middleware
// });

app.listen(PORT, () => {
  // Porta com funcao de callback
  console.log(`Server is running on port ${PORT}`);
});
