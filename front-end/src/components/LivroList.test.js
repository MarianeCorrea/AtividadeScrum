import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import LivroList from './LivroList';

test('renders LivroList component', () => {
  render(<LivroList />);
  
  // Verifica se o título da página está presente
  expect(screen.getByText('Lista de Livros')).toBeInTheDocument();
});

test('adds a new book', () => {
  render(<LivroList />);
  
  // Adiciona um novo livro
  fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Livro C' } });
  fireEvent.change(screen.getByLabelText('Autor'), { target: { value: 'Autor C' } });
  fireEvent.click(screen.getByText('Salvar'));
  
  // Verifica se o novo livro foi adicionado
  expect(screen.getByText('Livro C - Autor C')).toBeInTheDocument();
});

test('edits an existing book', () => {
  render(<LivroList />);
  
  // Adiciona um novo livro
  fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Livro C' } });
  fireEvent.change(screen.getByLabelText('Autor'), { target: { value: 'Autor C' } });
  fireEvent.click(screen.getByText('Salvar'));
  
  // Edita o livro adicionado
  fireEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]); // Seleciona o botão de editar
  fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Livro D' } });
  fireEvent.change(screen.getByLabelText('Autor'), { target: { value: 'Autor D' } });
  fireEvent.click(screen.getByText('Atualizar'));
  
  // Verifica se o livro foi atualizado
  expect(screen.getByText('Livro D - Autor D')).toBeInTheDocument();
});

/*
test('deletes a book', async () => {
  render(<LivroList />);
  
  // Adiciona um novo livro
  fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Livro C' } });
  fireEvent.change(screen.getByLabelText('Autor'), { target: { value: 'Autor C' } });
  fireEvent.click(screen.getByText('Salvar'));

  // Verifica se o novo livro foi adicionado
  expect(screen.getByText('Livro C - Autor C')).toBeInTheDocument();
  
  // Exclui o livro
  fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);

  // Verifica se o livro foi removido, aguardando a atualização do DOM
  await waitFor(() => {
    expect(screen.queryByText('Livro C - Autor C')).not.toBeInTheDocument();
  }, { timeout: 5000 });
});
*/
