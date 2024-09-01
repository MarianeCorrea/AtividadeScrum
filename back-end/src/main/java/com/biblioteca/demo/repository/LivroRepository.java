package com.biblioteca.demo.repository;

import com.biblioteca.demo.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Long> {
}
