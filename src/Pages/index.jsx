
import Home from './Home';
import Compras from './Compras';
import Produto from './Produto';
import Pagamento from './Pagamento';
import Carrinho from './Carrinho';
import CadastroProduto from './CadastroProduto';
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
  },
  {
    'path': '/pagamento/:order-id',
    'component': Pagamento
  },
  {
    'path': '/carrinho',
    'component': Carrinho
  },
  {
    'path': '/cadastro/produtos',
    'component': CadastroProduto
  }
];

export default Pages;
