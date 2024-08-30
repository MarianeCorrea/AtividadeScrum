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
 * Componente UsuarioList - Lista de Usuários com funcionalidade CRUD (Create, Read, Update, Delete).
 * Este componente permite adicionar, editar e remover usuários de uma lista.
 * Ele utiliza dados mockados para simular um backend, facilitando o teste.
 */
function UsuarioList() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Usuário A', email: 'usuarioa@example.com' },
    { id: 2, nome: 'Usuário B', email: 'usuariob@example.com' },
  ]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  // Função para salvar um novo usuário ou atualizar um existente
  const handleSave = () => {
    if (editId) {
      setUsuarios(usuarios.map(usuario => usuario.id === editId ? { id: editId, nome, email } : usuario));
      setEditId(null);
    } else {
      const newUsuario = { id: usuarios.length + 1, nome, email };
      setUsuarios([...usuarios, newUsuario]);
    }
    setNome('');
    setEmail('');
  };

  // Função para editar um usuário (preencher o formulário com os dados do usuário selecionado)
  const handleEdit = (usuario) => {
    setNome(usuario.nome);
    setEmail(usuario.email);
    setEditId(usuario.id);
  };

  // Função para excluir um usuário da lista
  const handleDelete = (id) => {
    setUsuarios(usuarios.filter(usuario => usuario.id !== id));
  };

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
