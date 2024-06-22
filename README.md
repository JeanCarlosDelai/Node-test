<h1 align="center"> Node-test </h1>

## 📄 Descrição do projeto

Este repositório tem a proposta de mostrar um projeto utilizando o framework nest abordando vários conceitos de Clean Code, SOLID, terraform para geração da infraestrutura, cognito para autenticação, controle de usuários e testes.

## 🛠 Funcionalidades do Projeto

- Cadastro de usuários
- Exclusão de usuários
- Listar informações do usuário
- Login
- Autenticação MFA no login
- Alteração de senha

## 🚩 Requisitos

- [Git](https://www.git-scm.com/downloads);
- [NodeJS](https://nodejs.org/en/);

<!-- ## 📺 Playlist no Youtube sobre o projeto

- [Youtube]() -->

## 💻 Como iniciar

- Para iniciar execute os seguintes comandos
- Recomendado usar o terminar do WSL/linux ou Git Bash para funcionar corretamente todos os comandos
- Abrir terminal

- Clone o repositorio na sua máquina local.

```sh
git clone https://github.com/JeanCarlosDelai/Node-test.git
```

- Acesse a pasta clonada

```sh
cd Node-test
```

- Rode o comando para instalar as dependências

```sh
npm install
```

- Criar arquivo .env com base no arquivo de exemplo, para configuração de variáveis de ambiente:

```sh
cp .env.example .env
```

- Rode as migrations

```sh
npm run migration:run
```

```sh
npm run build
npm run start
```

- Se optar por modo de desenvolvimento

```sh
npm run dev
```

## 🧪 Rodando os testes

- Para rodas os testes unitários:

```sh
npm run test
```

- Para rodar os testes de integração:

```sh
npm run test:integration
```

- Para rodas os testes e2e:

```sh
npm run test:e2e
```

- Para rodas os testes de mutação:

```sh
npm run test:mutation
```

### Verificar Cobertura

- Para verificar a cobertura dos testes unitários, execute o seguinte comando:

```sh
npm run test:cov
```

## ✅ Tecnologias utilizadas

- Linguagem: `Typescript`
- Ambiente te execução: `Node.js`
- Testes: `Vitest | Supertest`

## 👨🏻‍💻 Desenvolvedor

[<img src="https://avatars.githubusercontent.com/u/112594276?v=4" width="80px;"/>](https://github.com/JeanCarlosDelai)
