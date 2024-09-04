# Estudo de Caso: Sistema de Cadastro de Livros e Controle de Empréstimos

## Contexto
Este projeto tem como objetivo desenvolver um sistema completo de gerenciamento de livros e usuários, incluindo funcionalidades de CRUD (Create, Read, Update, Delete) para ambos, além de um controle simplificado de empréstimos de livros. A aplicação também deverá incluir um sistema de autenticação com login e senha, onde um usuário master terá acesso total ao sistema.

## Funcionalidades
### 1. Cadastro de Livros
- O sistema permitirá o cadastro de livros, onde cada livro terá informações como título, autor, ano de publicação, editora, ISBN, e número de exemplares disponíveis.
- Os usuários autenticados poderão criar, visualizar, atualizar e deletar informações dos livros cadastrados.

### 2. Cadastro de Usuários
- O sistema permitirá o cadastro de usuários, que terão acesso ao sistema para realizar operações de empréstimo de livros.
- Um CRUD completo será implementado para o gerenciamento dos usuários, permitindo ao usuário master gerenciar todos os perfis cadastrados.

### 3. Controle de Empréstimos
- Usuários autenticados poderão realizar o empréstimo de livros, que será registrado no sistema.
- O sistema controlará o status dos empréstimos (ativo, devolvido), bem como a data de empréstimo e devolução.

### 4. Autenticação
- O sistema deverá incluir um mecanismo de login e senha, onde cada usuário terá suas credenciais para acesso.
- Haverá um usuário master pré-configurado, com senha armazenada em uma propriedade segura do projeto, que terá acesso total ao sistema.

## Requisitos Funcionais
1. O sistema deve permitir o cadastro, consulta, atualização e exclusão de livros.
2. O sistema deve permitir o cadastro, consulta, atualização e exclusão de usuários.
3. O sistema deve permitir que os usuários registrem e acompanhem o status de empréstimos de livros.
4. O sistema deve exigir autenticação para acesso, com credenciais de login e senha.
5. O sistema deve ter um usuário master com acesso completo e inalterável, com senha definida em uma propriedade do projeto.

## Requisitos Não Funcionais
1. A aplicação deve ser desenvolvida utilizando Spring Boot para o backend.
2. O frontend deve ser implementado em uma tecnologia moderna como React ou Angular.
3. A senha do usuário master deve ser armazenada de forma segura, utilizando criptografia e sendo configurada por propriedades do projeto.
4. O sistema deve ser responsivo e acessível em diferentes dispositivos.
5. A aplicação deve ser facilmente configurável e executável em diferentes ambientes de desenvolvimento.

## Estudo de Caso
### Contexto e Motivação
A necessidade de um sistema de gerenciamento de livros surgiu em uma biblioteca comunitária que enfrentava dificuldades para controlar o inventário de livros e o status de empréstimos realizados pelos frequentadores. Com um sistema informatizado, seria possível não só melhorar a gestão de recursos, mas também oferecer uma experiência mais organizada e profissional para os usuários da biblioteca.

### Objetivo
O objetivo deste projeto é desenvolver uma solução robusta e escalável para a biblioteca, permitindo que os administradores gerenciem livros e usuários de forma eficiente, ao mesmo tempo em que oferece aos leitores a possibilidade de realizar empréstimos de forma prática e segura.

### Solução Proposta
A solução proposta é um sistema web, acessível via navegador, que integra todas as funcionalidades necessárias para o gerenciamento completo de uma biblioteca de pequeno a médio porte. A aplicação será composta por um backend em Spring Boot, que cuidará da lógica de negócio e persistência dos dados, e um frontend em React, que será responsável pela interface do usuário.

### Escopo do Projeto
O projeto abrange o desenvolvimento de todas as funcionalidades descritas, incluindo o sistema de autenticação e a implementação do usuário master. Além disso, serão criadas interfaces amigáveis para o usuário, que facilitarão a interação com o sistema. O projeto também incluirá documentação detalhada e instruções para a configuração e execução do sistema em diferentes ambientes de desenvolvimento.

