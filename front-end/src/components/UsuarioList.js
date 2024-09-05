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
import React, { useState, useEffect } from 'react';
 
function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);
 
  const API_URL = 'http://localhost:8080/api/usuarios';
 
 
  const fetchUsuarios = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao buscar usuários');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };
 
  const handleSave = async () => {
    try {
      const usuario = { nome, email };
      if (editId) {
       
        const response = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario),
        });
        if (!response.ok) throw new Error('Erro ao atualizar usuário');
        const updatedUsuario = await response.json();
        setUsuarios(usuarios.map(usuario => usuario.id === editId ? updatedUsuario : usuario));
        setEditId(null);
      } else {
       
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario),
        });
        if (!response.ok) throw new Error('Erro ao criar usuário');
        const newUsuario = await response.json();
        setUsuarios([...usuarios, newUsuario]);
      }
      setNome('');
      setEmail('');
    } catch (error) {
      console.error('Erro ao salvar usuário', error);
    }
  };
 
  const handleEdit = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditId(usuario.id);
  };
 
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir usuário');
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    } catch (error) {
      console.error('Erro ao excluir usuário', error);
    }
  };
 
  useEffect(() => {
    fetchUsuarios();
  }, []);
 
  return (
    <Container sx={{ paddingTop: '80px' }}>
      <h1>Lista de Usuários</h1>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Nome"
          variant="outlined"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          {editId ? 'Atualizar' : 'Salvar'}
        </Button>
      </div>
      <List>
        {usuarios.map(usuario => (
          <ListItem key={usuario.id} divider>
            <ListItemText primary={`${usuario.nome} - ${usuario.email}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(usuario)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(usuario.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
 
export default UsuarioList;