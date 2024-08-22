# Backend - Sistema de Biblioteca

## Requisitos
- Java 11 ou superior
- Maven 3.6 ou superior

## Passos para Instalação

1. **Clone o Repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO_BACKEND>
   cd springboot_backend
   ```

2. **Compile o Projeto**
   Use o Maven para compilar o projeto e baixar as dependências necessárias:
   ```bash
   mvn clean install
   ```

3. **Configuração do Usuário Master**
   No arquivo `application.properties`, defina a senha para o usuário master:
   ```properties
   spring.security.user.name=admin
   spring.security.user.password=supersecretpassword
   ```

4. **Executar a Aplicação**
   Após configurar o usuário master, execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```

5. **Acessar a Aplicação**
   A aplicação estará disponível em:
   ```
   http://localhost:8080
   ```

   - **Livros**: Acesse `http://localhost:8080/api/livros` para listar os livros.
   - **Usuários**: Acesse `http://localhost:8080/api/usuarios` para listar os usuários.

## Estrutura do Projeto

- `src/main/java/com/biblioteca/demo`: Contém o código fonte da aplicação.
- `src/main/resources`: Contém os arquivos de configuração, incluindo `application.properties`.

## Observações
- O sistema utiliza uma base de dados em memória (H2) para simplificar o desenvolvimento. 
- Para produção, configure um banco de dados persistente no arquivo `application.properties`.
