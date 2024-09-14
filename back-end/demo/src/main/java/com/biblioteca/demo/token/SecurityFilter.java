package com.biblioteca.demo.token;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.biblioteca.demo.entity.Usuario;
import com.biblioteca.demo.repository.UsuarioRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;
    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request); // Chama o método que retira a parte do token
        var login = tokenService.validateToken(token); // Passa o token e verifica a validade
       
        // Se o validateToken lá na classe TokenService constatar que o token não é valido, ele retorna null, se for válido retorna o email do usuário e, nesse caso, salva na variável 'login'
        if (login != null) { // Se houver um email (o token for válido)...
            Usuario usuario = usuarioRepository.findByEmail(login).orElseThrow(() -> new RuntimeException("User Not Found"));  // ... Busca no banco a partir do email, mas esse método ainda não existe no repositório, precisaremos criar mais tarde. O orElseThrow lança uma exceção se não achar o usuário, isso porque o método retornará um Optional<Usuario>.

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

    private String recoverToken(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            return null;
        }

        return authHeader.replace("Bearer ", "");
    }

}
