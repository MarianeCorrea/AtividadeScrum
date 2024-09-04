import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import UsuarioList from './UsuarioList';

test('renders UsuarioList component', () => {
  render(<UsuarioList />);
  
  // Verifica se o título da página está presente
  expect(screen.getByText('Lista de Usuários')).toBeInTheDocument();
});

test('adds a new user', () => {
  render(<UsuarioList />);
  
  // Adiciona um novo usuário
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Usuário C' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'usuarioc@example.com' } });
  fireEvent.click(screen.getByText('Salvar'));
  
  // Verifica se o novo usuário foi adicionado
  expect(screen.getByText('Usuário C - usuarioc@example.com')).toBeInTheDocument();
});

test('edits an existing user', () => {
  render(<UsuarioList />);
  
  // Adiciona um novo usuário
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Usuário C' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'usuarioc@example.com' } });
  fireEvent.click(screen.getByText('Salvar'));
  
  // Edita o usuário adicionado
  fireEvent.click(screen.getAllByRole('button', { name: /edit/i })[0]); // Seleciona o botão de editar
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Usuário D' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'usuariod@example.com' } });
  fireEvent.click(screen.getByText('Atualizar'));
  
  // Verifica se o usuário foi atualizado
  expect(screen.getByText('Usuário D - usuariod@example.com')).toBeInTheDocument();
});

/*
test('deletes a user', async () => {
  render(<UsuarioList />);
  
  // Adiciona um novo usuário
  fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Usuário C' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'usuarioc@example.com' } });
  fireEvent.click(screen.getByText('Salvar'));

  // Verifica se o novo usuário foi adicionado
  expect(screen.getByText('Usuário C - usuarioc@example.com')).toBeInTheDocument();
  
  // Exclui o usuário
  fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);

  // Verifica se o usuário foi removido, aguardando a atualização do DOM
  await waitFor(() => {
    expect(screen.queryByText('Usuário C - usuarioc@example.com')).not.toBeInTheDocument();
  }, { timeout: 5000 });
});
*/