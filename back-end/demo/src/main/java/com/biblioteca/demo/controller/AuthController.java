package com.biblioteca.demo.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.demo.dto.LoginRequestDTO;
import com.biblioteca.demo.dto.RegisterRequestDTO;
import com.biblioteca.demo.dto.ResponseDTO;
import com.biblioteca.demo.entity.Usuario;
import com.biblioteca.demo.repository.UsuarioRepository;
import com.biblioteca.demo.token.TokenService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor // Faz o Lombok gerar os construtores automaticamente
public class AuthController {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody @Validated LoginRequestDTO body) {
        // Verifica se o email ou a senha são nulos
        if (body.email() == null || body.senha() == null) {
            return ResponseEntity.badRequest().body(new ResponseDTO("Email ou senha não podem ser nulos", null));
        }

        // Verifica se o usuário existe
        Usuario usuario = repository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Se a senha passada no body bater com a senha do banco...
        if (passwordEncoder.matches(body.senha(), usuario.getSenha())) {
            String token = tokenService.generateToken(usuario); // Gera o token do usuário
            return ResponseEntity.ok(new ResponseDTO(usuario.getNome(), token)); // Retorna o nome do usuário e o token
        }
        return ResponseEntity.badRequest().body(new ResponseDTO("Credenciais inválidas", null)); // Senha não corresponde
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody @Validated RegisterRequestDTO body) {
        // Verifica se o email ou a senha são nulos
        if (body.email() == null || body.senha() == null) {
            return ResponseEntity.badRequest().body(new ResponseDTO("Email ou senha não podem ser nulos", null));
        }

        // Verifica se o usuário já existe
        Optional<Usuario> usuario = repository.findByEmail(body.email());

        // Se não existe...
        if (usuario.isEmpty()) {
            Usuario novoUsuario = new Usuario(); // Cria um novo usuário
            novoUsuario.setSenha(passwordEncoder.encode(body.senha())); // Define a senha criptografada
            novoUsuario.setEmail(body.email()); // Define o email
            novoUsuario.setNome(body.nome());
            repository.save(novoUsuario); // Salva no banco de dados

            String token = tokenService.generateToken(novoUsuario); // Gera o token do usuário
            return ResponseEntity.ok(new ResponseDTO(novoUsuario.getNome(), token)); // Retorna o nome do usuário e o token
        }
        return ResponseEntity.badRequest().body(new ResponseDTO("Usuário já existe", null)); // Usuário já cadastrado
    }

}
