# Autenticação através de Token JWT

Esse markdown tem como objetivo descrever o passo a passo aplicado nesse projeto para implementar tokens JWT para fins de aprendizado, a base do código foi retirado do seguinte vídeo: 

[PROJETO FULLSTACK COM LOGIN USANDO SPRING SECURITY + JWT | BACKEND por Fernanda Kipper](https://youtu.be/tJCyNV1G0P4?si=a9YMmBP_8OHZWfSz)

## Passo 1 - Dependencias

É necessário adicionar a dependência do Spring Security e do Java JWT:

```xml
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-test</artifactId>
    <version>6.3.3</version>
</dependency>

<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>4.4.0</version>
</dependency>
```
## Passo 2 - Criar a classe Model de Usuários
Lembrando que o Model é a representação da entidade dentro da lógica do back-end.
~~~java
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;

    <getters e setters>
    ...
}
~~~

## Passo 3 - Criar a interface Repository de Usuários
Essa interface será a responsável pelos métodos que permitem a comunicação com o banco de dados.

Lembrando que basta o repository ser uma interface que o JPA, em momento de execução irá gerar a implementação da classe e dos métodos. Na herança do JpaRepository são passados o tipo do componente e da sua chave primária.

~~~java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.biblioteca.demo.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
~~~

## Passo 4 - Criar a classe TokenService
Essa classe tem como finalidade gerar os tokens JWT e também verificar os tokens recebidos quando o front-end envia nas requisições.

~~~java
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    ...
}
~~~

### Passo 4.1 - Criar a chave para a criptografia
O primeiro método que criamos é para gerar o token JWT, ele é gerado usando um algoritmo de criptografia chamado HMAC256, esse algoritmo precisa de uma chave privada para o processo de geração de hash.

Por questões de segurança, essa chave de hash ficará no application properties, o código fica assim:

~~~java
// No TokenService
import org.springframework.beans.factory.annotation.Value;

@Value("${api.security.token.secret}")
private String secret;
~~~

~~~properties
# No application.properties
api.security.token.secret=minha-chave-secreta
~~~

Lembrando que no desenvolvimento real de um software, a manipulação dessa chave seria mais segura, com a utilização de variáveis de ambiente, por exemplo.

### Passo 4.2 - Criar o método de gerar token
O método de gerar token tem vários componentes que precisamos destacar, o código final é assim:
~~~java
public String generateToken(Usuario usuario) {
    try {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        String token = JWT.create()
                .withIssuer("demo")
                .withSubject(usuario.getEmail())
                .withExpiresAt(generateExpirationDate())
                .sign(algorithm);

        return token;
    } 
    catch (JWTCreationException exception) {
        throw new RuntimeException("Error while authenticating");
    }
}
~~~
Primeiramente, precisamos entender que a geração do token tem chances de lançar uma exceção, por isso tratamos ela com o try catch:
~~~java
    try {

        ...

    }
    catch (JWTCreationException exception) {
        throw new RuntimeException("Error while authenticating");
    }
~~~
Segundo, precisamos instanciar qual algoritmo usaremos e passamos na inicialização a chave secreta que geramos no tópico anterior:
~~~java
Algorithm algorithm = Algorithm.HMAC256(secret);
~~~
Depois fazemos o código de geração do token e retornamos ele:
~~~java
String token = JWT.create()
        .withIssuer("demo") // define o emissor do token
        .withSubject(usuario.getEmail()) // define o principal componente usado na geração do token
        .withExpiresAt(generateExpirationDate()) // define um tempo de expiração do token
        .sign(algorithm); // assina o token com o algoritmo especificado

return token;
~~~
O método generateExpirationDate() usado para definir o tempo de expiração do token é implementado por nós também:

### Passo 4.2.1 - Criar o método de definir um tempo de expiração do token
~~~java
private Instant generateExpirationDate() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
}
~~~

### Passo 4.2 - Criar o método de validar token
Na mesma classe TokenService faremos o próximo método responsável por validar os tokens dos usuários:
~~~java
public String validateToken(String token) {
    try {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.require(algorithm) // Recebe o algorítmo usado para criptografar o token
                .withIssuer("demo") // Especifica que para o token ser valido, deve ter sido feito por esse emissor
                .build() // Constrói o verificador de JWT com base nas especificações anteriores
                .verify(token) // Verifica se o token fornecido está válido
                .getSubject(); // Obtem, se o token for válido, o assunto dele, no caso, o email do usuário
    } 
    catch (JWTVerificationException exception) {
        return null; // Caso seja lançada uma exceção no .verify(token), apenas iremos enviar um valor nulo ao invés do email do usuário
    }
}
~~~
## Passo 5 - Criar o SecurityFilter (filtro de segurança)
## ...