
import Home from './Home';
import Compras from './Compras';
import Login from './Auth/Login';
import Cadastrar from './Auth/Cadastrar';

const Pages = [
  {
    'path': '/',
    'component': Home,
  },
  {
    'path': '/login',
    'component': Login,
  },
  {
    'path': '/compras',
    'component': Compras,
  },
  {
    'path': '/cadastrar',
    'component': Cadastrar
  }
];

export default Pages;
