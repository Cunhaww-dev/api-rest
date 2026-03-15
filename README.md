### API REST com Node.js e TypeScript

Este projeto serve como base de estudo e referencia para configuração inicial de um back-end em Node.js utilizando TypeScript. O foco é entender o ambiente, as dependências necessárias e o papel de cada configuração, evitando abstrações desnecessárias.

O objetivo deste README é funcionar como um guia passo a passo e também como material de consulta futura.

---

### Visão geral do ambiente

Este projeto utiliza:

- Node.js como runtime
- TypeScript como sistema de tipos e compilador
- ES Modules (`"type": "module"`)
- `tsx` para execução e hot reload em ambiente de desenvolvimento
- `express` para criação da API REST
- `zod` para validação de dados

A aplicação roda diretamente em TypeScript durante o desenvolvimento, sem necessidade de build manual.

---

### Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Node.js (versão alinhada com ES2024)
- npm ou outro gerenciador compatível

Recomendação: usar Node LTS recente.

---

### Inicialização do projeto

1. Inicialize o projeto Node:

```bash
npm init -y
```

2. Configure o projeto para usar ES Modules:

No `package.json`:

```json
"type": "module"
```

Isso garante compatibilidade com `import/export` nativo.

---

### Dependênciass necessárias

Instale as dependências de desenvolvimento:

```bash
npm install -D typescript tsx @types/node @types/express
```

Instale as dependências da aplicação:

```bash
npm install express zod
```

Responsabilidade de cada uma:

- `typescript`
  Responsável pela checagem de tipos e compilação.

- `@types/node`
  Fornece as definições de tipos do ambiente Node.js (`console`, `process`, `fs`, `Buffer`, etc).

- `@types/express`
  Tipagem para os objetos do Express (`Request`, `Response`, `NextFunction`, etc).

- `tsx`
  Permite executar arquivos `.ts` diretamente no Node, com suporte a watch mode.

- `express`
  Framework HTTP para definir rotas, middlewares e respostas.

- `zod`
  Biblioteca de validação de schema para dados recebidos nas requisições.

---

### Scripts de desenvolvimento

No `package.json`:

```json
"scripts": {
  "dev": "tsx watch src/server.ts"
}
```

Esse script:

- Executa o arquivo principal em TypeScript
- Recarrega automaticamente ao salvar alterações

Para rodar:

```bash
npm run dev
```

Servidor padrão:

- `http://localhost:3333`

---

### Configuração do TypeScript (`tsconfig.json`)

Este projeto utiliza uma configuração moderna e explícita, adequada para back-end.

Principais opções e seus significados:

- `target: "ES2024"`
  Define a versão do JavaScript gerado, alinhada com Node moderno.

- `module: "esnext"`
  Mantém a sintaxe moderna de módulos ES.

- `moduleResolution: "bundler"`
  Estratégia de resolução de módulos compatível com o ecossistema atual.

- `lib: ["ES2024"]`
  Define apenas APIs da linguagem JavaScript, sem assumir ambiente de browser.

- `types: ["node"]`
  Declara explicitamente que o código roda em Node.js.

- `strict: true`
  Ativa checagens rigorosas de tipos.

Essa configuração é essencial para o TypeScript reconhecer corretamente `console`, `process`, `fs`, `timers`, `streams`, etc.

---

### Referência oficial para target e Node

A escolha correta de `target` e `module` depende da versão do Node utilizada.

A tabela oficial de mapeamento pode ser consultada em:
[https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping)

Esse link deve ser usado sempre que houver dúvida sobre qual target utilizar.

---

### Estrutura do projeto

```text
src/
  controllers/
    products-controller.ts
  middlewares/
    my-middleware.ts
  routes/
    index.ts
    products-routes.ts
  types/
    request.d.ts
  utils/
    app-error.ts
  server.ts
package.json
tsconfig.json
README.md
```

---

### Papel de cada arquivo

- `src/server.ts`
  Ponto de entrada da aplicação. Cria o app Express, aplica `express.json()`, registra rotas e middleware global de tratamento de erros (`AppError`, `ZodError` e fallback 500).

- `src/routes/index.ts`
  Roteador principal. Centraliza os módulos de rota e monta `/products`.

- `src/routes/products-routes.ts`
  Rotas de produtos. Liga os endpoints aos métodos de `ProductsController` e aplica `myMiddleware` no `POST /products`.

- `src/controllers/products-controller.ts`
  Regras dos endpoints de produtos:
  - `index`: leitura de query params (`page`, `limit`)
  - `create`: validação com Zod (`name`, `price`) e retorno do payload criado

- `src/middlewares/my-middleware.ts`
  Middleware de exemplo que injeta `request.user_id = '123456'` e chama `next()`.

- `src/types/request.d.ts`
  Extensão de tipo global do Express para adicionar `user_id` em `Request`.

- `src/utils/app-error.ts`
  Classe de erro customizado para exceções de negócio com `statusCode`.

- `package.json`
  Metadados do projeto, dependências e script de execução.

- `tsconfig.json`
  configuração do compilador TypeScript e regras de tipagem.

---

### Rotas atuais da API

Base URL local:

```text
http://localhost:3333
```

#### `GET /products`

Descrição:

- Lista/retorna mensagem com paginação via query params

Query params aceitos:

- `page`
- `limit`

Exemplo:

```http
GET /products?page=1&limit=10
```

Resposta atual:

```text
Página 1 de 10
```

<!-- ESPAÇO PARA PRINT DO INSOMNIA - GET /products -->
<!-- Cole aqui um screenshot da requisição e resposta -->

---

#### `POST /products`

Descrição:

- Cria produto com validação de body usando Zod
- Usa middleware local para anexar `user_id` na request

Body JSON esperado:

```json
{
  "name": "Produto Exemplo",
  "price": 79.9
}
```

Regras de validação:

- `name`: obrigatório, string, `trim`, mínimo de 6 caracteres
- `price`: obrigatório, npumero, positivo

Exemplo:

```http
POST /products
Content-Type: application/json
```

Resposta de sucesso (`201`):

```json
{
  "name": "Produto Exemplo",
  "price": 79.9,
  "user_id": "123456"
}
```

Exemplo de erro de validação (`400`):

```json
{
  "message": "Validation error! Check the issues property for more details.",
  "issues": {}
}
```

<!-- ESPAÇO PARA PRINT DO INSOMNIA - POST /products (sucesso) -->
<!-- Cole aqui um screenshot com body válido e resposta 201 -->

<!-- ESPAÇO PARA PRINT DO INSOMNIA - POST /products (erro de validação) -->
<!-- Cole aqui um screenshot com body inválido e resposta 400 -->

---

### Tratamento de erros

A aplicação possui middleware global de erro no `server.ts`:

- `AppError` -> retorna `statusCode` definido com mensagem amigável
- `ZodError` -> retorna `400` com detalhes de validação em `issues`
- Erros não tratados -> retorna `500`

Isso evita expor detalhes internos sensíveis do servidor.

---

### Exemplo de fluxo de requisição (POST /products)

1. requisição chega na rota `POST /products`
2. `myMiddleware` adiciona `user_id` na request
3. `ProductsController.create` valida body com Zod
4. Em sucesso, retorna `201` com JSON
5. Em erro, middleware global padroniza a resposta

<!-- ESPAÇO PARA PRINT DO FLUXO / DIAGRAMA -->
<!-- Opcional: cole aqui um print do fluxo da requisição -->

---

### Exemplo básico de `server.ts` (conceito inicial)

```ts
function sum(a: number, b: number): number {
  return a + b;
}

const result = sum(5, 7);
console.log('Resultado da soma:', result);
```

Esse exemplo valida:

- Tipagem
- execução via `tsx`
- Reconhecimento do ambiente Node

---

### Observações importantes

- Não adicionar `"dom"` em `lib` para projetos back-end
- Sempre declarar o ambiente via `types`
- TypeScript não infere runtime automaticamente
- configuração explícita evita erros silenciosos

---

### Objetivo do projeto

Este repositório não é um framework nem boilerplate genérico. Ele existe para:

- Entender o funcionamento real do TypeScript no Node
- Servir como base para APIs REST
- Ser referência de configuração correta

---

### Próximos passos possíveis

- Estruturação de novas rotas (`show`, `update`, `remove`)
- Criaãoo de camada de serviçoes
- Persistência de dados
- Separação por camadas
- Testes automatizados (unitários/integrados)
- Documentação OpenAPI/Swagger

Cada evolução deve manter o mesmo nível de clareza e responsabilidade por arquivo.

---

### espaço para exemplos HTTP (Insomnia/Postman)

#### Coleções

<!-- ESPAÇO PARA LINK/PRINT DA COLLECTION DO INSOMNIA -->

#### métodos HTTP testados

- [ ] `GET /products`
- [ ] `POST /products`
- [ ] `PUT /products/:id` (futuro)
- [ ] `DELETE /products/:id` (futuro)

<!-- ESPAÇO PARA PRINT GERAL COM TODOS OS métodos HTTP -->
