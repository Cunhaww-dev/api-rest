import type { Request, Response, NextFunction } from 'express';

// next tem acesso á próxima requsição, ou seja, a próxima função que vai ser executada depois do middleware
export function myMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {

   request.user_id = '123456' // Adicionando o user_id ao objeto request, para que ele possa ser acessado em qualquer rota que use esse middleware
   console.log('Middleware executado');

   return next(); // Chamando a próxima função, ou seja, a próxima requisição
}
