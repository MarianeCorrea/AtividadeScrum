package com.biblioteca.demo.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.biblioteca.demo.entity.Usuario;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer("demo") // define o emissor do token
                    .withSubject(usuario.getEmail()) // define o principal componente usado na geração do token
                    .withExpiresAt(generateExpirationDate()) // define um tempo de expiração do token
                    .sign(algorithm); // assina o token com o algoritmo especificado

            return token;

        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while authenticating");
        }
    }

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

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
