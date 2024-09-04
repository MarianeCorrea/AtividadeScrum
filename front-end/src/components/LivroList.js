import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

function LivroList() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try {
      const response = await axios.get('/api/livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const handleSave = async () => {
    if (editId) {
      // Update existing book
      try {
        await axios.put(`/api/livros/${editId}`, { titulo, autor });
        setLivros(livros.map(livro => (livro.id === editId ? { id: editId, titulo, autor } : livro)));
        setEditId(null);
      } catch (error) {
        console.error('Erro ao atualizar livro:', error);
      }
    } else {
      // Create new book
      try {
        const response = await axios.post('/api/livros', { titulo, autor });
        setLivros([...livros, response.data]);
      } catch (error) {
        console.error('Erro ao criar livro:', error);
      }
    }
    setTitulo('');
    setAutor('');
  };

  const handleEdit = (livro) => {
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setEditId(livro.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/livros/${id}`);
      setLivros(livros.filter(livro => livro.id !== id));
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
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
