import React, { useState, useEffect } from 'react';

function LivroList() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch('/api/livros')
      .then(response => response.json())
      .then(data => setLivros(data));
  }, []);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map(livro => (
          <li key={livro.id}>{livro.titulo} - {livro.autor}</li>
        ))}
      </ul>
    </div>
  );
}

export default LivroList;
