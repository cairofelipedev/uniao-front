// auth.ts

import axios from 'axios';

interface LoginResponse {
  token: string;
}

export const getToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post<LoginResponse>('http://caiodssilva.com.br:35000/api/v1/login', {
      usuario: 'A',
      senha: 'a',
      loja: '00',
    });

    const token = response.data.token;

    if (token) {
      // Armazena o token no localStorage ou em outro local seguro
      localStorage.setItem('token', token);
      return token;
    } else {
      console.error('Token não encontrado na resposta.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
};
