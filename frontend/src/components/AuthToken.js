export const loginUser = async (email, senha) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, senha }),
    });

    

    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    const data = await response.json();
    
    // Adicione um console.log para verificar a resposta do backend
    console.log('Resposta do backend:', data);

    // Supondo que o token está na propriedade `token` do objeto retornado
    return data.token; 
  } catch (error) {
    console.error('Erro ao realizar login teste de console:', error);
    throw error;
  }
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};
