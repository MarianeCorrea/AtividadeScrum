package com.biblioteca.demo.controller;

import com.biblioteca.demo.entity.Livro;
import com.biblioteca.demo.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> getAllLivros() {
        return livroService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> getLivroById(@PathVariable Long id) {
        Optional<Livro> livro = livroService.findById(id);
        return livro.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Livro createLivro(@RequestBody Livro livro) {
        return livroService.save(livro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> updateLivro(@PathVariable Long id, @RequestBody Livro livroDetails) {
        Optional<Livro> livro = livroService.findById(id);
        if (livro.isPresent()) {
            Livro updatedLivro = livro.get();
            updatedLivro.setTitulo(livroDetails.getTitulo());
            updatedLivro.setAutor(livroDetails.getAutor());
            updatedLivro.setIsbn(livroDetails.getIsbn());
            updatedLivro.setNumeroExemplares(livroDetails.getNumeroExemplares());
            return ResponseEntity.ok(livroService.save(updatedLivro));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLivro(@PathVariable Long id) {
        livroService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
