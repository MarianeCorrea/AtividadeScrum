package com.biblioteca.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.biblioteca.demo.entity.Livro;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
}
