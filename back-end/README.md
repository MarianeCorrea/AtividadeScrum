# Autenticação através de Token JWT

Esse markdown tem como objetivo descrever o passo a passo aplicado nesse projeto para implementar tokens JWT para fins de aprendizado, a base do código foi retirado do seguinte vídeo:

[PROJETO FULLSTACK COM LOGIN USANDO SPRING SECURITY + JWT | BACKEND por Fernanda Kipper](https://youtu.be/tJCyNV1G0P4?si=a9YMmBP_8OHZWfSz)

## Passo 1 - Dependencias

É necessário adicionar a dependência do Spring Security Test, Spring Security Config e do Java JWT:

```xml
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-config</artifactId>
    <version>6.3.3</version>
</dependency>
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

```java
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
```

## Passo 3 - Criar a interface Repository de Usuários

Essa interface será a responsável pelos métodos que permitem a comunicação com o banco de dados.

Lembrando que basta o repository ser uma interface que o JPA, em momento de execução irá gerar a implementação da classe e dos métodos. Na herança do JpaRepository são passados o tipo do componente e da sua chave primária.

```java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.biblioteca.demo.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
```

## Passo 4 - Criar a classe TokenService

Essa classe tem como finalidade gerar os tokens JWT e também verificar os tokens recebidos quando o front-end envia nas requisições.

```java
import org.springframework.stereotype.Service;

@Service
public class TokenService {
    ...
}
```

### Passo 4.1 - Criar a chave para a criptografia

O primeiro método que criamos é para gerar o token JWT, ele é gerado usando um algoritmo de criptografia chamado HMAC256, esse algoritmo precisa de uma chave privada para o processo de geração de hash.

Por questões de segurança, essa chave de hash ficará no application properties, o código fica assim:

```java
// No TokenService
import org.springframework.beans.factory.annotation.Value;

@Value("${api.security.token.secret}")
private String secret;
```

```properties
# No application.properties
api.security.token.secret=minha-chave-secreta
```

Lembrando que no desenvolvimento real de um software, a manipulação dessa chave seria mais segura, com a utilização de variáveis de ambiente, por exemplo.

### Passo 4.2 - Criar o método de gerar token

O método de gerar token tem vários componentes que precisamos destacar, o código final é assim:

```java
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
```

Primeiramente, precisamos entender que a geração do token tem chances de lançar uma exceção, por isso tratamos ela com o try catch:

```java
    try {

        ...

    }
    catch (JWTCreationException exception) {
        throw new RuntimeException("Error while authenticating");
    }
```

Segundo, precisamos instanciar qual algoritmo usaremos e passamos na inicialização a chave secreta que geramos no tópico anterior:

```java
Algorithm algorithm = Algorithm.HMAC256(secret);
```

Depois fazemos o código de geração do token e retornamos ele:

```java
String token = JWT.create()
        .withIssuer("demo") // define o emissor do token
        .withSubject(usuario.getEmail()) // define o principal componente usado na geração do token
        .withExpiresAt(generateExpirationDate()) // define um tempo de expiração do token
        .sign(algorithm); // assina o token com o algoritmo especificado

return token;
```

O método generateExpirationDate() usado para definir o tempo de expiração do token é implementado por nós também:

### Passo 4.2.1 - Criar o método de definir um tempo de expiração do token

```java
private Instant generateExpirationDate() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
}
```

### Passo 4.3 - Criar o método de validar token

Na mesma classe TokenService faremos o próximo método responsável por validar os tokens dos usuários:

```java
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
```

## Passo 5 - Criar o SecurityFilter (filtro de segurança)

A classe SecurityFilter tem a finalidade de filtrar todas as requisições recebidas para verificar se o usuário que fez essas requisições está autenticado com um token válido.

A base inicial da classe é assim:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.biblioteca.demo.repository.UsuarioRepository;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;
    @Autowired
    UsuarioRepository usuarioRepository;

    ...

}
```

Essa classe herda da classe OncePerRequestFilter pois sua finalidade é justamente, como o nome diz, fazer uma filtragem verificando o token para cada requisição.

### Passo 5.1 - Criar método recoverToken, método auxiliar

O método principal dessa classe não é o que criaremos nesse passo, é um outro responsável por fazer a verificação do token, porém esse método principal precisa de um método auxiliar para salvar o token recebido pela requisição numa variável, por isso criaremos o método auxiliar primeiro.

Esse método auxiliar chamado recoverToken começa separando a parte da requisição onde o token está salvo, normalmente na parte chamada "Authorization" da header da requisição. Depois o método verifica se há de fato essa parte:

```java
private String recoverToken(HttpServletRequest request) {
    var authHeader = request.getHeader("Authorization");

    if (authHeader == null) return null;

    return authHeader.replace("Bearer ", "");
}
```

Se houver, como é possível notar no final, ele retorna essa parte, porém substituindo uma parte da string, isso porque o token chegará com algo como:

`Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

E queremos remover a parte escrito "Bearer " para ter o token puro:

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

Lembrando que esse token é um de exemplo.

Já o método principal será feito dessa forma:

### Passo 5.2 - Criar o método doFilterInternal, que fará a filtragem

```java
@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    var token = this.recoverToken(request); // Chama o método que retira a parte do token
    var login = tokenService.validateToken(token); // Passa o token e verifica a validade

    // Se o validateToken lá na classe TokenService constatar que o token não é valido, ele retorna null, se for válido retorna o email do usuário e, nesse caso, salva na variável 'login'
    if (login != null) { // Se houver um email (o token for válido)...
        Usuario usuario = usuarioRepository.findByEmail(login).orElseThrow(() -> new RuntimeException("User Not Found"));  // ... Busca no banco a partir do email, mas esse método ainda não existe no repositório, precisaremos criar mais tarde. O orElseThrow lança uma exceção se não achar o usuário, isso porque o método retornará um Optional<User>.

        //  Cria uma variável contendo as autorizações que esse usuário possui, no caso apenas de USER.
        var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        // Cria o objeto que terá a autenticação do usuário.
        var authentication = new UsernamePasswordAuthenticationToken(usuario, null, authorities);
        // Adiciona essa autenticação no contexto de segurança da aplicação.
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    // Depois dessa verificação, continua as filtragens que serão feitas no SecurityConfig mais pra frente
    filterChain.doFilter(request, response);
}
```

Como mostrei no comentário da linha logo abaixo do **if**, precisamos implementar o método findByEmail no repository, ele ficará assim:

```java
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email); // Esse é o método
}
```

## Passo 6 - Criar a classe CustomUserDetailsService para consultar os usuários

```java
@Component
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UsuarioRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Usuario usuario = this.repository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not Found")); // O username é o email.
       return new org.springframework.security.core.userdetails.User(usuario.getEmail(), usuario.getSenha(), new ArrayList<>());
    }
}
```

Este código personalizado de UserDetailsService carrega informações de um usuário a partir do seu email (que é considerado o username) durante a autenticação. Ele busca o usuário no banco de dados utilizando o repositório e, se encontrado, cria um objeto UserDetails com as informações do usuário, incluindo email e senha, para ser utilizado pelo Spring Security no processo de autenticação.

## Passo 7 - Criar a classe SecurityConfiguration que vai definir a autorização para cada requisição

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration // Essa classe será carregada antes das outras por ser de configuração
@EnableWebSecurity // A classe que vai cuidar da segurança web do Sprint Security
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    SecurityFilter securityFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disabled())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //
                .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
                .anyRequest().authenticated()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
```

Essa classe vai ser a responsável pelas configurações de segurança da aplicação. Vamos entender esse codigo parte por parte. As anotações na classe já estão explicadas, vamos para o método primeiramente:

```java
@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //
            .authorizeHttpRequests(authorize -> authorize
            .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
            .anyRequest().authenticated()
            )
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
}
```

Primeiramente, a anotação `@Bean`:

- Ela define que esse método irá gerar um objeto que deve ser injetado nas dependências do container do projeto.

Segundo, `.csrf(csrf -> csrf.disable())`:

- Nessa parte estamos desabilitando a proteção CSRF (Cross-Site Request Forgery), o que deve ser feito com cuidado.

Terceiro, `sessionManagement()`:

- Essa parte, da forma como está escrita, define que a aplicação não dependerá de estados (STATELESS), o que na prática significa que cada requisição será tratada de uma forma independente, sem precisar consultar informações armazenadas em uma sessão. Portanto, elas a aplicação não guarda informações de login nela, o que é a base das API's RestFul.

Quarto:

```java
.authorizeHttpRequests(authorize -> authorize
.requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
.requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
.anyRequest().authenticated()
)
```

- Nessa parte estamos definindo todas as regras de requisições específicas, em essência, para as duas URL definidas (registro e login) é permitido acesso sem autenticação, para o restante, é preciso estar autenticado, essa parte poderia ter requisições mais específicas a depender da existência de mais Roles ou de mais URLs

Quinto:

```java
.addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);
```

Isso faz com que o filtro que foi definido no SecurityFilter (Passo 5) seja executado antes do filtro padrão, lembrando que esse filtro do Passo 5 recupera o token do Header da requisição, verifica a validade e adiciona no contexto do Spring Security se for validada.

Sexto:

```java
 @Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
```

Esse Bean retorna o codificador que irá ser responsável por criptografar a senha antes dela ser salva no banco de dados.

Sétimo:

```java
@Bean
public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
}
```

Esse método retorna o gerenciador de autenticação, como é um @Bean, irá retornar para injetar nas dependências do container da aplicação, isso é essencial para o funcionamento do Spring Boot com Spring Security.

## Passo 8 - Criar a o controlador AuthController

Agora iremos criar o controlador que irá receber as requisições de login e registro, sua construção inicial será assim:

```java
@RestController // Define que esse é um Rest Controller
@CrossOrigin(origins = "http://localhost:3000") // Habilita o CrossOrigin para que a aplicação de Front-end consiga se comunicar
@RequestMapping("/api/auth") // Especifica o caminho base desse controller
@RequiredArgsConstructor // Faz o Lombok gerar os construtores automaticamente
public class AuthController {
    ...
}
```

Vamos ao primeiro método:

```java
@PostMapping("/register")
public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
    // Verifica se o usuário recebido já existe (não deveria)
    Optional<Usuario> usuario = this.repository.findByEmail(body.email());

    // Se não existe...
    if(usuario.isEmpty()) {
        Usuario novoUsuario = new Usuario(); // ... cria agora...
        novoUsuario.setSenha(passwordEncoder.encode(body.senha())); // ... define a senha criptografada...
        novoUsuario.setEmail(body.email()); // ... define o email...
        novoUsuario.setNome(body.nome()); // ... define o nome ...
        this.repository.save(novoUsuario); // ... e salva no banco de dados.

        String token = this.tokenService.generateToken(novoUsuario); // gera o token do usuário...
        return ResponseEntity.ok(new ResponseDTO(novoUsuario.getNome(), token)); // e retorna o nome do usuário e o token.
    }
    return ResponseEntity.badRequest().build(); // caso contrário, retorna um badRequest (você já existe)
}
```

Vamos entender ele melhor:

Aqui estamos capitando as requisições feitas no /api/auth/register. Essas requisições contém um body, para poder configurar de forma mais fácil qual é o tipo do body, usamos um DTO, também conhecido como _Data Transfer Object_, que consiste basicamente em um padrão de projeto para transporte de dados entre diferentes componentes de um sistema, nela passamos os atributos numa classe simplificada, nesse primeiro método temos 2 DTOs e no próximo temos mais um, vamos entender cada um deles:

### Passo 8.1 - DTO's da Request do Registro e da Response

O **primeiro** DTO usado é o RegisterRequestDTO, ele é o DTO usado para quando o front-end envia dados através da requisição http, no registro, o front-end irá enviar o nome, email e senha do usuário, portanto esses três valores ficarão no DTO:

```java
public record RegisterRequestDTO(String nome, String email, String senha) {
}
```

O **segundo** DTO será usado para enviar de volta algo para o front-end, no caso, a response do back-end, que é o nome do usuário e o token:

```java
public record ResponseDTO(String nome, String token) {
}
```

### Passo 8.2 Método de login e DTO da Request do Login

O próximo método do controller não é tão diferente do de registro, é até mais simples, aqui estamos verificando se o usuário passado no body existe (através do email). Se ele não existir, é lançada uma exceção, se existir, conferimos se a senha bate, se ela bate, geramos o token e encaminhamos de volta.

```java
@PostMapping("/login")
public ResponseEntity login(@RequestBody LoginRequestDTO body) {
    // Verifica se o usuário existe (se não existir, lança uma exceção)
    Usuario usuario = this.repository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));
    // Se a senha passada no body bater com a senha do banco...
    if (passwordEncoder.matches(body.senha(), usuario.getSenha())) {
        String token = this.tokenService.generateToken(usuario); // ... gera o token do usuário...
        return ResponseEntity.ok(new ResponseDTO(usuario.getNome(), token)); // ... e retorna o nome do usuário e o token.
    }
    return ResponseEntity.badRequest().build(); // caso contrário, retorna um badRequest (sua senha não bate)
}
```

Nesse caso, também usamos um DTO para descrever o que foi recebido do front-end nessa requisição, ele ficaria assim:

```java
public record LoginRequestDTO (String email, String senha) {
}
```

## Passo 9 - CorsConfig, que habilita as requisições entre origens diferentes
Criamos uma nova chasse chamada CorsConfig que vai ter apenas um método chamado addCorsMappings que tem a finalidade de permitir requisições de origens diferentes, nesse caso passamos o localhost na porta em que nossa aplicação React no front-end irá rodar e os quatro métodos HTTP básicos.

~~~java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://local:3000")
                .allowedMethods("GET", "POST", "DELETE", "PUT");
    }
}
~~~
