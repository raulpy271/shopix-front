
import Home from './Home';
import Compras from './Compras';
import Produto from './Produto';
import Me from './Me';
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
  },
  {
    'path': '/me',
    'component': Me
  },
  {
    'path': '/produto/:id',
    'component': Produto
  }
];

export default Pages;
