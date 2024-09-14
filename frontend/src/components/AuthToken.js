<<<<<<< HEAD
export const loginUser = async (email, senha) => {
=======


export const loginUser = async (username, password) => {
>>>>>>> 40b417e3c4a2c5d5d4a805331d40234e267a202a
  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
<<<<<<< HEAD
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ email, senha }),
    });

    

=======
      },
      body: JSON.stringify({ username, password }),
    });

>>>>>>> 40b417e3c4a2c5d5d4a805331d40234e267a202a
    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }

    const data = await response.json();
<<<<<<< HEAD
    
    // Adicione um console.log para verificar a resposta do backend
    console.log('Resposta do backend:', data);

    // Supondo que o token está na propriedade `token` do objeto retornado
    return data.token; 
  } catch (error) {
    console.error('Erro ao realizar login teste de console:', error);
=======

    // Supondo que o token está na propriedade `token` do objeto retornado
    return data.token; // Ajuste conforme necessário
  } catch (error) {
    console.error('Erro ao realizar login:', error);
>>>>>>> 40b417e3c4a2c5d5d4a805331d40234e267a202a
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
