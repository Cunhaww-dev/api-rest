// arquivo com serve .d.ts para declarar tipos globais
declare namespace Express {
  // Sobrescreve o namespace Express para adicionar tipos personalizados

  export interface Request {
    // Sobrescreve a interface Request para adicionar o tipo user_id
    user_id: string;
  }
}
