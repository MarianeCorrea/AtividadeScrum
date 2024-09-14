<<<<<<< HEAD
# Aplicação Biblioteca Majokam

A biblioteca Majokam é o projeto da disciplina de Fullstack do curso de Análise e Desenvolvimento de Sistemas da faculdade Senac Palhoça, feita pelos alunos Mariane Correa, João Vitor Ventura e Sandokam Bussola.

## Tecnologias utilizadas

### Front-end
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)

### Back-end
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

## Pré-requisitos para executar o projeto
É necessário ter o Git instalado.
### Front-end
É preciso ter o Node.js instalado.

### Back-end
É preciso ter o JDK instalado na versão 21.

### IDE
Para ambos, a IDE recomendada é o VS Code, mas fica a seu cargo escolher qual utilizar

## Instalação do Projeto
### Clonando o projeto
Na pasta desejada no seu computador abra o terminal (de preferência o [git bash](https://git-scm.com/downloads)) e clone o projeto:

```bash
git clone <link_do_projeto>
```
Substituia o conteúdo nos colchetes angulares pelo link do projeto.
### Após a clonagem
Você irá se deparar com três diretórios, o diretório 'docs' contém a documentação pública do projeto, os outros dois são os repositórios do front-end e back-end separados. Abaixo estão os passos para executar separadamente ambos.
### Front-end
### Instalando dependências
Acesse a pasta front-end do projeto através do seguinte comando:
```bash
cd front-end
```
Estando no diretório do front-end especificamente, execute o seguinte npm para instalar as dependências do projeto:
```bash
npm install
```
Esse comando pode demorar alguns minutos para terminar a execução, dependendo da velocidade da sua internet. Depois disso, aparecerão uma pasta chamada 'node_modules' e um arquivo chamado 'package-lock.json', você já pode executar a aplicação:
```bash
npm start
```
### Back-end
### Instalando extensões
Caso esteja usando o VSCode como IDE para executar o back-end do projeto, recomendamos fortemente a instalação destes dois pacotes de extensões para executar aplicações Java e Spring Boot respectivamente:

[Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
<br>
[Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack)

Após isso, vá até o arquivo application.properties
~~~shell
    └───src
        └───main
            └───resources
                └───application.properties
~~~
E modifique as seguintes propriedades:
~~~properties
spring.datasource.username=<seu usuário do MySQL>
spring.datasource.password=<senha desse usuário>
~~~
Acessando o MySQL com este usuário no seu computador, execute o seguinte código na linha de comando/query:
~~~SQL
CREATE DATABASE db_biblioteca;
~~~
Após isso, você pode executar a aplicação, caso haja um erro de versão, provavelmente será a versão do Java, como explicado anteriormente, a versão necessária é a 21, caso você não consiga instala-la, pode a modificar no arquivo pom.xml em:
~~~shell
demo
    └───pom.xml
~~~
Lá, altere a seguinte linha de código para a versão desejada:
~~~xml
<java.version>21</java.version>
~~~
Tendo feito isso, sua aplicação deve executar normalmente.
## Contribuição

Este é um projeto simples de faculdade, não há intenção por nossa parte de expandir o sistema, portanto não vimos necessidade de contribuição, no entanto, caso queira, pode entrar em contato com um dos integrantes para falar sobre o projeto.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
=======
### Construção da Aplicação de Gestão de Livros e Usuários com React e Material-UI

- - -

#### Índice

1.  [Introdução](#introdução)
2.  [Tecnologias Utilizadas](#tecnologias-utilizadas)
3.  [Estrutura da Aplicação](#estrutura-da-aplicação)
4.  [Componentes](#componentes)
    *   [Componente LivroList](#componente-livrolist)
    *   [Componente UsuarioList](#componente-usuariolist)
5.  [Testes Unitários](#testes-unitários)
    *   [Estrutura dos Testes](#estrutura-dos-testes)
    *   [Como Executar os Testes](#como-executar-os-testes)
6.  [Como Executar a Aplicação](#como-executar-a-aplicação)
7.  [Conclusão](#conclusão)

- - -

### Introdução

Este documento visa explicar detalhadamente a construção de uma aplicação web simples para gerenciamento de livros e usuários. A aplicação foi desenvolvida utilizando **React**, uma biblioteca JavaScript popular para construção de interfaces de usuário, e **Material-UI**, uma biblioteca de componentes estilizados seguindo o design system do Google.

A aplicação permite que os usuários realizem operações de **CRUD** (Create, Read, Update, Delete) tanto para livros quanto para usuários. Além disso, foram implementados testes unitários para garantir a funcionalidade correta dos componentes.

- - -

### Tecnologias Utilizadas

1.  **React**: Biblioteca JavaScript para construção de interfaces de usuário.
2.  **Material-UI**: Biblioteca de componentes React que implementa o design system do Google.
3.  **React Testing Library**: Ferramenta para testar componentes React, focando em como os componentes são usados por um usuário real.
4.  **Jest**: Framework de testes JavaScript, usado em conjunto com a React Testing Library para realizar os testes unitários.

- - -

### Estrutura da Aplicação

A aplicação é estruturada em vários componentes React, cada um responsável por uma parte específica da interface de usuário. Os principais componentes são `LivroList` e `UsuarioList`, que gerenciam a lista de livros e usuários, respectivamente.

A estrutura básica do projeto é a seguinte:

```
/src
/components
LivroList.js
LivroList.test.js
UsuarioList.js
UsuarioList.test.js
App.js
App.css
index.js
```

- - -

### Componentes

#### Componente LivroList

O componente `LivroList` é responsável por gerenciar a lista de livros. Ele permite adicionar, editar e excluir livros. Cada livro possui um título e um autor.

**Estrutura do Componente:**

*   **Estado**: O estado `livros` armazena a lista de livros, cada livro é um objeto com `id`, `titulo` e `autor`.
*   **Funções**:
    *   `handleSave`: Adiciona um novo livro ou atualiza um livro existente.
    *   `handleEdit`: Preenche os campos de entrada com os dados do livro a ser editado.
    *   `handleDelete`: Exclui um livro da lista.
*   **Renderização**:
    *   Campos de entrada para título e autor, botões para salvar, editar e excluir.

**Código Simplificado:**

```
const [livros, setLivros] = useState([...]);

const handleSave = () => { /* ... */ };
const handleEdit = (livro) => { /* ... */ };
const handleDelete = (id) => { /* ... */ };

return (

Lista de Livros

{/* Campos de entrada e botões */}


{livros.map(livro => (

{/* Título e autor do livro, botões de editar e excluir */}

))}


);
```

#### Componente UsuarioList

O componente `UsuarioList` tem uma funcionalidade muito similar ao `LivroList`, mas ele gerencia uma lista de usuários, onde cada usuário possui um nome e um email.

**Estrutura do Componente:**

*   **Estado**: O estado `usuarios` armazena a lista de usuários, cada usuário é um objeto com `id`, `nome` e `email`.
*   **Funções**:
    *   `handleSave`: Adiciona um novo usuário ou atualiza um usuário existente.
    *   `handleEdit`: Preenche os campos de entrada com os dados do usuário a ser editado.
    *   `handleDelete`: Exclui um usuário da lista.
*   **Renderização**:
    *   Campos de entrada para nome e email, botões para salvar, editar e excluir.

**Código Simplificado:**

```
const [usuarios, setUsuarios] = useState([...]);

const handleSave = () => { /* ... */ };
const handleEdit = (usuario) => { /* ... */ };
const handleDelete = (id) => { /* ... */ };

return (

Lista de Usuários

{/* Campos de entrada e botões */}


{usuarios.map(usuario => (

{/* Nome e email do usuário, botões de editar e excluir */}

))}


);
```

- - -

### Testes Unitários

Os testes unitários são essenciais para garantir que as funcionalidades principais da aplicação funcionem conforme o esperado. Nesta aplicação, os testes foram criados para os componentes `LivroList` e `UsuarioList`, cobrindo as operações de CRUD. Para realizar os testes foi utilizado o [Jest](https://jestjs.io/docs/tutorial-react).

#### Estrutura dos Testes

Cada componente tem sua própria classe de teste, por exemplo, `LivroList.test.js` para o componente de livros e `UsuarioList.test.js` para o de usuários. Os testes cobrem as seguintes operações:

*   **Renderização**: Verifica se o componente é renderizado corretamente.
*   **Adicionar**: Testa se um novo item é adicionado corretamente à lista.
*   **Editar**: Verifica se um item pode ser editado corretamente.
*   **Excluir**: Testa se um item é removido corretamente da lista.

#### Como Executar os Testes

1.  **Instalar Dependências de Teste**: Se ainda não estiverem instaladas, execute:

```
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest
```

2.  **Executar os Testes**: Para rodar todos os testes, execute:

```
npm test
```

Para rodar um teste específico, por exemplo, o teste do `LivroList`:

```
npm test LivroList.test.js
```

Os testes utilizarão o Jest e o React Testing Library para verificar se as operações em cada componente funcionam como esperado.

- - -

### Como Executar a Aplicação

1.  **Clone o Repositório**: Se ainda não tem o código, clone o repositório do projeto:

```
git clone <url-do-repositorio>
```

2.  **Instale as Dependências**: Navegue até o diretório do projeto e instale as dependências necessárias:

```
npm install
```

3.  **Execute a Aplicação**: Após a instalação das dependências, você pode rodar a aplicação:

```
npm start
```

Isso iniciará o servidor de desenvolvimento, e a aplicação estará disponível no navegador em `http://localhost:3000`.
>>>>>>> 40b417e3c4a2c5d5d4a805331d40234e267a202a
