# Requisitos Funcionais e Não Funcionais

## Requisitos Funcionais
1. **Cadastro de Livros:**
   - O sistema deve permitir o cadastro de novos livros com os campos: título, autor, ano de publicação, editora, ISBN e número de exemplares disponíveis.
   - Deve ser possível consultar, atualizar e excluir os registros de livros cadastrados.
   
2. **Cadastro de Usuários:**
   - O sistema deve permitir o cadastro de novos usuários com os campos: nome, e-mail, senha e tipo de usuário (comum ou administrador).
   - Deve ser possível consultar, atualizar e excluir os registros de usuários cadastrados.

3. **Controle de Empréstimos:**
   - O sistema deve permitir que usuários realizem o empréstimo de livros disponíveis.
   - Deve ser possível registrar a data de empréstimo, data de devolução e status do empréstimo (ativo ou devolvido).
   - O sistema deve impedir o empréstimo de livros que não possuem exemplares disponíveis.

4. **Autenticação de Usuários:**
   - O sistema deve exigir autenticação por login e senha para acesso.
   - Deve haver um usuário master pré-configurado, com senha definida em uma propriedade do projeto, que terá acesso total ao sistema.

5. **Interface do Usuário:**
   - O sistema deve fornecer uma interface web que permita aos usuários interagir com as funcionalidades descritas.
   - A interface deve ser intuitiva e fácil de usar.

## Requisitos Não Funcionais
1. **Tecnologia de Backend:**
   - O backend deve ser desenvolvido utilizando Spring Boot.

2. **Tecnologia de Frontend:**
   - O frontend deve ser desenvolvido utilizando uma tecnologia moderna, preferencialmente React ou Angular.

3. **Segurança:**
   - A senha do usuário master deve ser armazenada de forma segura, utilizando criptografia adequada.
   - O sistema deve proteger as informações dos usuários e dados de empréstimos.

4. **Escalabilidade:**
   - O sistema deve ser escalável para suportar um número crescente de usuários e livros sem perda significativa de desempenho.

5. **Responsividade:**
   - A aplicação deve ser responsiva, garantindo uma boa usabilidade em diferentes dispositivos (desktops, tablets, smartphones).

6. **Documentação e Configuração:**
   - O sistema deve incluir documentação clara e detalhada para configuração e execução em diferentes ambientes.
   - O sistema deve ser facilmente configurável, permitindo alterações rápidas nas propriedades de configuração, como a senha do usuário master.
