import React, { useState, useEffect } from 'react';

function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('/api/usuarios')
      .then(response => response.json())
      .then(data => setUsuarios(data));
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>{usuario.nome} - {usuario.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioList;
