### Documento Didático: Construção da Aplicação de Gestão de Livros e Usuários com React e Material-UI

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