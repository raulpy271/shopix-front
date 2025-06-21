
import { toast } from 'react-toastify';
import useForm from '@Components/UseForm';
import {Label, Button, TextInput} from "flowbite-react";
import Template from '../../Layouts/Template';


export default function Login() {
  const {data, setData, error, processing, post} = useForm({"username": null, "fullname": null, "email": null, "password": null});
  const handleSubmit = async () => {
    const res = await post('/users/register', data);
    if (res) {
      toast("Cadastro realizado com sucesso");
      setTimeout(() => window.location = '/', 1000);
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
