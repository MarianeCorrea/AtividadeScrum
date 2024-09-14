import React, { useState, useEffect } from 'react';
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
      const response = await fetch('http://localhost:8080/api/livros');
      if (!response.ok) throw new Error('Erro ao buscar livros');
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };
 
  const handleSave = async () => {
    const livro = { titulo, autor };
    try {
      if (editId) {
     
        const response = await fetch(`http://localhost:8080/api/livros/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(livro),
        });
        if (!response.ok) throw new Error('Erro ao atualizar livro');
        const updatedLivro = await response.json();
        setLivros(livros.map(livro => (livro.id === editId ? updatedLivro : livro)));
        setEditId(null);
      } else {
     
        const response = await fetch('http://localhost:8080/api/livros', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(livro),
        });
        if (!response.ok) throw new Error('Erro ao criar livro');
        const newLivro = await response.json();
        fetchLivros();
      }
    } catch (error) {
      console.error('Erro ao salvar livro:', error);
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
      const response = await fetch(`http://localhost:8080/api/livros/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar livro');
     
      fetchLivros();
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