### API REST com Node.js e TypeScript

Este projeto serve como base de estudo e referência para configuração inicial de um back-end em Node.js utilizando TypeScript. O foco é entender o ambiente, as dependências necessárias e o papel de cada configuração, evitando abstrações desnecessárias.

O objetivo deste README é funcionar como um guia passo a passo e também como material de consulta futura.

---

### Visão geral do ambiente

Este projeto utiliza:

- Node.js como runtime
- TypeScript como sistema de tipos e compilador
- ES Modules (type: module)
- tsx para execução e hot reload em ambiente de desenvolvimento

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

npm init -y

2. Configure o projeto para usar ES Modules:

No package.json:

"type": "module"

Isso garante compatibilidade com import/export nativo.

---

### Dependências necessárias

Instale as dependências de desenvolvimento:

npm install -D typescript tsx @types/node

Responsabilidade de cada uma:

- typescript
  Responsável pela checagem de tipos e compilação.

- @types/node
  Fornece as definições de tipos do ambiente Node.js (console, process, fs, Buffer, etc).

- tsx
  Permite executar arquivos .ts diretamente no Node, com suporte a watch mode.

---

### Scripts de desenvolvimento

No package.json:

"scripts": {
"dev": "tsx watch src/server.ts"
}

Esse script:

- Executa o arquivo principal em TypeScript
- Recarrega automaticamente ao salvar alterações

---

### Configuração do TypeScript (tsconfig.json)

Este projeto utiliza uma configuração moderna e explícita, adequada para back-end.

Principais opções e seus significados:

- target: "ES2024"
  Define a versão do JavaScript gerado, alinhada com Node moderno.

- module: "nodenext"
  Garante compatibilidade correta com ES Modules no Node.js.

- lib: ["ES2024"]
  Define apenas as APIs da linguagem JavaScript, sem assumir ambiente de browser.

- types: ["node"]
  Declara explicitamente que o código roda em Node.js.

Essa opção é essencial para que o TypeScript reconheça console, process, fs, timers, streams, etc.

---

### Referência oficial para target e Node

A escolha correta de target e module depende da versão do Node utilizada.

A tabela oficial de mapeamento pode ser consultada em:
[https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping](https://github.com/microsoft/TypeScript/wiki/Node-Target-Mapping)

Esse link deve ser usado sempre que houver dúvida sobre qual target utilizar.

---

### Estrutura mínima esperada

src/
server.ts

O arquivo server.ts é o ponto de entrada da aplicação.

---

### Exemplo básico de server.ts

function sum(a: number, b: number): number {
return a + b;
}

const result = sum(5, 7);
console.log('Resultado da soma:', result);

Esse exemplo valida:

- Tipagem
- Execução via tsx
- Reconhecimento do ambiente Node

---

### Observações importantes

- Não adicionar "dom" em lib para projetos back-end
- Sempre declarar o ambiente via types
- TypeScript não infere runtime automaticamente
- Configuração explícita evita erros silenciosos

---

### Objetivo do projeto

Este repositório não é um framework nem boilerplate genérico. Ele existe para:

- Entender o funcionamento real do TypeScript no Node
- Servir como base para APIs REST
- Ser referência de configuração correta

---

### Próximos passos possíveis

- Estruturação de rotas
- Criação de middlewares
- Persistência de dados
- Separação por camadas

Cada evolução deve manter o mesmo nível de clareza e responsabilidade por arquivo.
