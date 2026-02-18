import { Router } from 'express';
import { myMiddleware } from '../middlewares/my-middleware';
import { ProductsController } from '../controllers/products-controller';

const productsRoutes = Router();
const productsController = new ProductsController();

// Recuperando parametros não nomeados Query params
// productsRoutes.get('/', (request, response) => {
//   // const { page, limit } = request.query; // Pegando os query params da rota (req.query)
//   // response.send(`Página ${page} de ${limit}`); //http://localhost:3333/products?page=1&limit=10
// });

// Utilizando controller para separar as funções/ações, dessa maneira a nossa rota fica muito mais simples e apenas com a responsabilidade de realizar o roteamento
productsRoutes.get('/', productsController.index);

// Enviar dados com o body da requisição
// Middleware local em uma rota específica, ou seja, o middleware só vai ser executado quando a rota POST /products for chamada
// productsRoutes.post('/', myMiddleware, (request, response) => {
//   // o next de dentro do middleware sabe qual é a próxima função, ou seja, a função de callback da rota POST /products
//   // const { name, price } = request.body; // Pegando os dados do body da requisição (req.body)
//   // // response.send(`Produto ${name} custa $ ${price}`); // content-type text/plain
//   // response.status(201).json({ name, price, user_id: request.user_id }); // Enviando os dados de volta como JSON Garante o content-type application/json e converte o objeto para JSON automaticamente
//   // user_id é o tipo que adicionamos no arquivo .d.ts, e que foi adicionado ao objeto request dentro do middleware, ou seja, ele pode ser acessado em qualquer rota que use esse middleware
// });

// Utilizando controller para separar as funções/ações, matemos o middleware local na função pois ele continua interceptando a rota.
productsRoutes.post('/', myMiddleware, productsController.create);

export { productsRoutes };
