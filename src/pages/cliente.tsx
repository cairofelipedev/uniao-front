// pages/ClientePage.tsx

import { useState } from 'react';
import axios from 'axios';
import { getToken } from '@/utils/functions/auth';

const ClientePage: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');

  const handleCheckCPF = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.error('Token não encontrado. Usuário não autenticado.');
        return;
      }

      // Use o token para fazer a chamada à API
      const response = await axios.get(`http://caiodssilva.com.br:35000/api/v1/clientes/${cpf}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Verifique se o CPF foi encontrado
      if (response.data) {
        // Atualize o estado com o nome do usuário
        setNome(response.data.nome);
      } else {
        console.log('CPF não encontrado.');
        setNome('');
      }
    } catch (error) {
      console.error('Erro ao verificar o CPF:', error);
    }
  };

  return (
    <div>
      <h1>Verificar CPF</h1>
      <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
      <button onClick={handleCheckCPF}>OK</button>
      {nome && <p>Nome: {nome}</p>}
    </div>
  );
};

export default ClientePage;
