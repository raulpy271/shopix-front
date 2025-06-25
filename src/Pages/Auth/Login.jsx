
import api from '../../Controllers/api';
import {Label, Button, TextInput} from "flowbite-react";
import { toast } from 'react-toastify';
import Template from '../../Layouts/Template';
import {useState} from 'react';
import Cookies from 'js-cookie'

export function setTokenCookie(token) {
  Cookies.set('token', token, {'expires': 1})
}

export default function Login() {
  const [user, setUser] = useState({"username": null, "password": null});
  const handleChange = (evt) => {
    user[evt.target.name] = evt.target.value;
    setUser(user)
  }
  const handleSubmit = () => {
    api.post('/users/auth', user)
      .then(res => {
        setTokenCookie(res.data['token'])
        toast(" Login realizado com sucesso")
        setTimeout(() => window.location = '/', 2000);
      }).catch(err => {
        toast.error("Credenciais inválidas, tente novamente!")
      })
  }
  return (
    <div>
      <Template>
        <div className="grid justify-center align-center pb-10">
          <h2 className="text-lg font-bold">Realize login na Shopix</h2>
          <br/>
          <form className="flex w-md flex-col justify-center">
            <div className="py-2">
              <Label className="text-black dark:text-black">Username</Label>
              <TextInput name="username" onChange={handleChange}/>
            </div>
            <div className="py-2">
              <Label className="text-black dark:text-black">Senha</Label>
              <TextInput name="password" type="password" onChange={handleChange}/>
            </div>
            <br/>
            <Button onClick={handleSubmit}>Realizar Login</Button>
          </form>
        </div>
      </Template>
    </div>
  )
}
