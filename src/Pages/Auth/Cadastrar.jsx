
import {useState} from 'react';
import useForm from '@Components/UseForm';
import {Label, Button, TextInput} from "flowbite-react";
import Template from '../../Layouts/Template';
import {redirect} from 'react-router-dom';


export default function Login() {
  const [successMsg, setSuccess] = useState(""); 
  const {data, setData, error, processing, post} = useForm({"username": null, "fullname": null, "email": null, "password": null});
  const handleSubmit = async () => {
    const res = await post('/users/register', {});
    if (res) {
      setSuccess("Cadastro realizado com sucesso");
      setTimeout(() => window.location = '/', 500);
    } else {
      setSuccess("");
    }
  }
  return (
    <div>
      <Template>
        <div className="grid justify-center align-center">
          <h2 className="text-lg font-bold">Realizar Cadastro na Shopix</h2>
          <h2 className="text-md text-red-600">{(error && error.message) ? error.message: ""}</h2>
          <h2 className="text-md text-green-300 dark:text-green-600">{successMsg}</h2>
          <br/>
          <form className="flex w-md flex-col justify-center">
            <div className="py-2">
              <Label className="text-black dark:text-black">Username</Label>
              <TextInput name="username" onChange={e => setData("username", e.target.value)}/>
            </div>
            <div className="py-2">
              <Label className="text-black dark:text-black">Nome completo</Label>
              <TextInput name="fullname" onChange={e => setData("fullname", e.target.value)}/>
            </div>
            <div className="py-2">
              <Label className="text-black dark:text-black">Email</Label>
              <TextInput name="email" type="email" onChange={e => setData("email", e.target.value)}/>
            </div>
            <div className="py-2">
              <Label className="text-black dark:text-black">Senha</Label>
              <TextInput name="password" type="password" onChange={e => setData("password", e.target.value)}/>
            </div>
            <br/>
            <Button onClick={handleSubmit} disabled={processing}>Realizar Cadastro</Button>
          </form>
        </div>
      </Template>
    </div>
  )
}
