import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'; // Import Container from Material-UI
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

/**
 * Componente LivroList - Lista de Livros com funcionalidade CRUD (Create, Read, Update, Delete).
 * Este componente permite adicionar, editar e remover livros de uma lista.
 * Ele utiliza dados mockados para simular um backend, facilitando o teste.
 */
function LivroList() {
  const [livros, setLivros] = useState([
    { id: 1, titulo: 'Livro A', autor: 'Autor A' },
    { id: 2, titulo: 'Livro B', autor: 'Autor B' },
  ]);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editId, setEditId] = useState(null);

  // Função para salvar um novo livro ou atualizar um existente
  const handleSave = () => {
    if (editId) {
      setLivros(livros.map(livro => livro.id === editId ? { id: editId, titulo, autor } : livro));
      setEditId(null);
    } else {
      const newLivro = { id: livros.length + 1, titulo, autor };
      setLivros([...livros, newLivro]);
    }
    setTitulo('');
    setAutor('');
  };

  // Função para editar um livro (preencher o formulário com os dados do livro selecionado)
  const handleEdit = (livro) => {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setEditId(livro.id);
  };

  // Função para excluir um livro da lista
  const handleDelete = (id) => {
    setLivros(livros.filter(livro => livro.id !== id));
  };

  return (
    <Container sx={{ paddingTop: '80px' }}>
      <h1>Lista de Livros</h1>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Título"
          variant="outlined"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Autor"
          variant="outlined"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          {editId ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
      <List>
        {livros.map(livro => (
          <ListItem key={livro.id} divider>
            <ListItemText primary={`${livro.titulo} - ${livro.autor}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(livro)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(livro.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default LivroList;
