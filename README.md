
# Documentação do Sistema

O sistema é composto por uma API Rest desenvolvida em .NET Core 8 e uma aplicação front-end em Angular. Ele permite o gerenciamento de usuários, produtos, clientes e pedidos, com operações de leitura, criação e edição. 


## Ferramentas e Dependências

*Back-end (API Rest):*
- `.NET Core 8`
- `Entity Framework Core (para acesso ao banco de dados)`
- `MySQL`

*Front-end (Angular):*
- `Angular 19`
- `Yarn ou npm (para gerenciamento de pacotes)`
- [Angular Material V19](https://material.angular.io/)
- [PrimeNG V19](https://primeng.org/)

## Estrutura do Projeto

#### Back-end (API Rest)

A API é organizada em controllers, modelos (models) e serviços (services). Abaixo estão os principais endpoints:

### Usuários

- `GET /api/Users - Lista todos os usuários.`
- `GET /api/Users/{id} - Retorna um usuário específico.`
- `POST /api/Users - Cria um novo usuário.`
- `DELETE /api/Users/{id} - Exclui um usuário.`

#### Produtos

- `GET /api/Products - Lista todos os produtos.`
- `GET /api/Products/{id} - Retorna um produto específico.`
- `POST /api/Products - Cria um novo produto.`
- `DELETE /api/Products/{id} - Exclui um produto.`

#### Clientes

- `GET /api/Customer - Lista todos os clientes.`
- `GET /api/Customer/{id} - Retorna um cliente específico.`
- `POST /api/Customer - Cria um novo cliente.`
- `DELETE /api/Customer/{id} - Exclui um cliente.`

#### Pedidos

- `GET /api/Orders - Lista todos os pedidos.`
- `GET /api/Orders/{id} - Retorna um pedido específico.`
- `POST /api/Orders - Cria um novo pedido.`
- `DELETE /api/Orders/{id} - Exclui um pedido.`
- `GET /api/Orders/GetAllUserForLookupTable - Retorna uma lista de usuários para lookup.`
- `GET /api/Orders/GetAllCustomerForLookupTable - Retorna uma lista de clientes para lookup.`


### Front-end (Angular)
#### Usuários:
 - `Listagem de usuários.`
 - `Formulário de criação/edição de usuários.`

#### Produtos:
 - `Listagem de produtos.`
 - `Formulário de criação/edição de produtos.`

#### Clientes:
 - `Listagem de clientes.`
 - `Formulário de criação/edição de clientes.`

#### Pedidos:
 - `Listagem de pedidos.`
 - `Formulário de criação de pedidos (com seleção de cliente, produtos e cálculo do total).`
## Instalação e Execução do Projeto
## Pré-requisitos

Certifique-se de ter instalado:

 - Node.js (versão recomendada: 18+)
 - Yarn ou NPM
 - .NET SDK 8
 - Visual Studio 2022 (para rodar com IIS Express)

## Instalação do Frontend (Angular)
```
# Navegue até a pasta do projeto Angular
cd angular

# Instale as dependências (use Yarn ou NPM)
yarn install  # ou npm install

# Execute o projeto
npm start
```
*O frontend estará disponível em: http://localhost:4200/*

### Instalação do Backend (.NET 8)
```
# Navegue até a pasta do projeto backend
cd API_DotNet

# Restaure os pacotes
dotnet restore

# Execute a aplicação com IIS Express
dotnet run
```
#### Configuração da ConnectionString
No arquivo appsettings.json, você precisa configurar a ConnectionString para se conectar ao seu banco de dados. Substitua os valores padrão pelos dados do seu ambiente:

```
 "ConnectionStrings": {
   "DefaultConnection": "server=localhost;database=db_api_dotnet;user=admin;password=rpwUD9H1]{@:_oMo"
 },
```
- SEU_SERVIDOR: O endereço do servidor do banco de dados (ex: localhost).

 - SEU_BANCO_DE_DADOS: O nome do banco de dados que você deseja usar (ex: db_api_dotnet).

 - SEU_USUARIO: O nome de usuário para acessar o banco de dados (ex: admin).

 - SUA_SENHA: A senha para acessar o banco de dados.

#### Criando o Banco de Dados
Após configurar a ConnectionString, você pode criar o banco de dados e aplicar as migrações usando o Entity Framework Core.

```
Update-Database
```


*O backend estará disponível em: http://localhost:33556/ ou pela porta configurada no launchSettings.json.*