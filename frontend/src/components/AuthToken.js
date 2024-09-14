

export const loginUser = async (username, password) => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    const data = await response.json();

    // Supondo que o token está na propriedade `token` do objeto retornado
    return data.token; // Ajuste conforme necessário
  } catch (error) {
    console.error('Erro ao realizar login:', error);
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
