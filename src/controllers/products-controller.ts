import type { Request, Response } from 'express';
import { AppError } from '../utils/app-error';
import { z } from 'zod';

export class ProductsController {
  // Boa prática, vamos padronizar os controllers.
  // Vão ter no máximo 5 métodos:

  // index - GET para listar vários registros
  // show - GET para listar um registro específico
  // create - POST para criar um registro
  // update - PUT para atualizar um registro
  // remove - DELETE para atualizar um registro
  // Se o controller precisa de mais um método alem desses então pode ser que seja necessário criar um outro controller para esse método

  index(request: Request, response: Response) {
    const { page, limit } = request.query; // Pegando os query params da rota (req.query)

    response.send(`Página ${page} de ${limit}`); //http://localhost:3333/products?page=1&limit=10
  }

  create(request: Request, response: Response) {
    // const { name, price } = request.body; // Pegando os dados do body da requisição (req.body)

    // Caso o usuário/client não informe o campo name devemos informar ao usuário, isso se chama tratativa de requisição
    // if (!name) {
    //   throw new AppError('Nome do produto é obirgatório');
    // }

    // if (name.trim.length < 6) {
    //   throw new AppError('Nome do produto deve ter no mínimo 6 caracteres');
    // }

    // if (!price) {
    //   throw new AppError('Preço do produto é obirgatório');
    // }

    // if (price < 0) {
    //   throw new AppError('Preço do produto não pode ser menor do que 0');
    // }

    // Validações com ZOD
    const bodySchema = z.object({
      // Objeto
      name: z
        .string('Name is required')
        .trim()
        .min(6, 'Name must be at least 6 characters'), // String, campo obrigatório, com mensagem personalizada, e com validação de mínimo de caracteres
      // price: z.number().nullish(), // O campo price é opcional, ou seja, pode ser null ou undefined
      price: z
        .number('Price is required')
        .positive('Price must be a positive number') // Number, campo obrigatório, com mensagem personalizada, e com validação de número positivo
        // .gte(10, 'Price must be at least 10'), // Validação de número maior ou igual a 10
    });

    const { name, price } = bodySchema.parse(request.body);

    // Tratativa de excessão de erro
    // throw new Error('Erro ao tentar criar um produto');

    // Não precisamos passar o status code pois por padrão vai ser o 400
    //  throw new AppError('Erro ao tentar criar um produto');

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}
