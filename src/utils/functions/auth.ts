// auth.ts

import axios from 'axios';

interface LoginResponse {
  token: string;
}

export const getToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/login`, {
      usuario: process.env.NEXT_PUBLIC_API_USER,
      senha: process.env.NEXT_PUBLIC_API_PASSWORD,
      loja: process.env.NEXT_PUBLIC_API_STORE,
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
