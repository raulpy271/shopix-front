
import Template from '../../Layouts/Template';
import { toast } from 'react-toastify';
import { Card, Label, Button, TextInput} from "flowbite-react";
import useForm from '@Components/UseForm';
import {getMe} from '@Components/Auth';
import {getAddresses } from '@Controllers/api';
import { useEffect, useState } from 'react';

export default function Me() {
  const [me, setMe] = useState(null);
  const [addresses, setAddresses] = useState(null);
  useEffect(() => {
    (async () => {
      if (!me) {
        const meRes = await getMe();
        setMe(meRes);
        const addressesRes = await getAddresses();
        console.log(addressesRes)
        setAddresses(addressesRes);
      }
    })();
  }, [me]);
  return (
    <div>
      <Template>
        <div className="flex flex-col">
          <div>
            <Card href="#" className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Página do usuário <span className="text-green-900 dark:text-green-400">{me?.username}</span>
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Nome completo: <span className="text-gray-900 dark:text-white">{me?.fullname}</span>
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Email: <span className="text-gray-900 dark:text-white">{me?.email}</span>
              </p>
            </Card>
          </div>
          <div className="pt-5">
            <Address addresses={addresses} setAddresses={setAddresses}/>
          </div>
        </div>
      </Template>
    </div>
  )
}

export function Address({addresses, setAddresses}) {
  const {data, setData, error, processing, post} = useForm({
    street: null,
    number: null,
    neighborhood: null,
    city: null,
    state: null,
    complement: null,
    zipCode: null
  });
  const handleSubmit = () => {
    post('/users/addresses', data)
    .then(res => {
      toast("Endereço cadastrado com sucesso!");
      getAddresses()
      .then(addressesRes => {
        setAddresses(addressesRes);
      });
    });
  }
  return (
    <div>
      <div>
        {
          addresses ?
            <div>
              <h2 className="text-lg font-bold">Seus endereços:</h2>
                {
                  addresses.map((addr, i) => 
                    <div key={i} className="pt-2 pl-5">
                      <h3>Rua: {addr.street} {addr?.complement} - {addr.number}</h3>
                      <h3>Bairro: {addr.neighborhood}</h3>
                      <h3>Cidade: {addr.city} / {addr.state} / {addr.zipCode}</h3>
                    </div>
                  )
                }
            </div>
          : null
        }
      </div>
      <h2 className="pt-5 text-lg font-bold">Cadastrar endereços:</h2>
      <form className="flex w-md flex-col justify-center">
        <div className="py-2">
          <Label className="text-black dark:text-black">Rua: </Label>
          <TextInput name="street" onChange={e => setData("street", e.target.value)}/>
        </div>
        <div className="py-2">
          <Label className="text-black dark:text-black">Número: </Label>
          <TextInput name="number" onChange={e => setData("number", e.target.value)}/>
        </div>
        <div className="py-2">
          <Label className="text-black dark:text-black">Bairro: </Label>
          <TextInput name="neighborhood" onChange={e => setData("neighborhood", e.target.value)}/>
        </div>
        <div className="py-2">
          <Label className="text-black dark:text-black">Cidade: </Label>
          <TextInput name="city" onChange={e => setData("city", e.target.value)}/>
        </div>
        <div className="py-2">
          <Label className="text-black dark:text-black">Estado: </Label>
          <TextInput name="state" onChange={e => setData("state", e.target.value)}/>
        </div>
        <div className="py-2">
          <Label className="text-black dark:text-black">CEP: </Label>
          <TextInput name="zipCode" onChange={e => setData("zipCode", e.target.value)}/>
        </div>
        <div className="py-2">
          <Label className="text-black dark:text-black">Complemento: </Label>
          <TextInput name="complement" onChange={e => setData("complement", e.target.value)}/>
        </div>
        <br/>
        <Button onClick={handleSubmit} disabled={processing}>Adicionar endereço</Button>
      </form>
    </div>
  )
}
