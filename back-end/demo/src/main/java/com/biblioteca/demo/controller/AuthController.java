package com.biblioteca.demo.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.biblioteca.demo.dto.LoginRequestDTO;
import com.biblioteca.demo.dto.RegisterRequestDTO;
import com.biblioteca.demo.dto.ResponseDTO;
import com.biblioteca.demo.entity.Usuario;
import com.biblioteca.demo.repository.UsuarioRepository;
import com.biblioteca.demo.security.TokenService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="http://localhost:3000")
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final  UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){

        Usuario usuario = this.repository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));
         
        if(passwordEncoder.matches(body.senha(), usuario.getSenha())){
            String token = this.tokenService.generateToken(usuario);
            return ResponseEntity.ok(new ResponseDTO(usuario.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {

        Optional<Usuario> usuario = this.repository.findByEmail(body.email());

        if(usuario.isEmpty()){
            Usuario novoUsuario = new Usuario();
            novoUsuario.setSenha(passwordEncoder.encode(body.senha()));
            novoUsuario.setEmail(body.email());
            novoUsuario.setNome(body.nome());
            this.repository.save(novoUsuario);

            String token = this.tokenService.generateToken(novoUsuario);
            return ResponseEntity.ok(new ResponseDTO(novoUsuario.getNome(), token));
        }
        return  ResponseEntity.badRequest().build();
    }
    
}
