// Imports
import {
  SubmitHandler,
  useForm,
  useFormContext,
  FormProvider,
} from 'react-hook-form';

// Components
import { InputField } from '@/components/Input/InputField.component';
import Button from '../UI/Button.component';

// Constants
import { INPUT_FIELDS } from '@/utils/constants/INPUT_FIELDS';
import { ICheckoutDataProps } from '@/utils/functions/functions';

import { useState } from 'react';
import axios from 'axios';
import { getToken } from '@/utils/functions/auth';


interface IBillingProps {
  handleFormSubmit: SubmitHandler<ICheckoutDataProps>;
}

const OrderButton = () => {
  const { register } = useFormContext();

  return (
    <div className="w-full p-2">
      <select
        placeholder="paymentMethod"
        {...register('paymentMethod')}
      >
        <option value="cod">COD</option>
        <option value="pagseguro">PagSeguro</option>
      </select>
      <div className="mt-4 flex justify-center">
        <Button>FINALIZAR PEDIDO</Button>
      </div>
    </div>
  );
};

const Billing = ({ handleFormSubmit }: IBillingProps) => {
  const methods = useForm<ICheckoutDataProps>();
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [cpfVerified, setCpfVerified] = useState(false);

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
        setCpfVerified(true);
        methods.setValue('firstName', response.data.nome);
      } else {
        console.log('CPF não encontrado.');
        setNome('');
      }
    } catch (error) {
      console.error('Erro ao verificar o CPF:', error);
    }
  };
  return (
    <section className="text-gray-700 container p-4 py-2 mx-auto">
      <FormProvider {...methods}>
        <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
          <div class="mb-2">
            <div class="-mx-2 flex items-end">
              <div class="flex-grow px-2 lg:max-w-xs">
                <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Digite seu CPF</label>
                <div>
                  <input class="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>
              </div>
              <div class="px-2">
                <button onClick={handleCheckCPF} class="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">BUSCAR</button>
              </div>
            </div>
          </div>
        </div>
        {cpfVerified && (
          <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
            <div className="mx-auto flex flex-wrap">
              {INPUT_FIELDS.map(({ id, label, name, customValidation }) => (
                <InputField
                  key={id}
                  inputLabel={label}
                  inputName={name}
                  customValidation={customValidation}
                />
              ))}
              <OrderButton />
            </div>
          </form>
        )}
      </FormProvider>
    </section>
  );
};

export default Billing;
