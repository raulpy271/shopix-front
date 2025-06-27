
import Cookies from 'js-cookie'
import api from '@Controllers/api'


export const loggedPages = ['/', '/compras', '/me', '/produto/*', '/carrinho', '/cadastro/*'];

export async function getMe() {
  const token = Cookies.get('token');
  if (token) {
    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch {
      return;
    }
  }
}

export async function willRedirectToLogin() {
  const token = Cookies.get('token');
  if (!token) {
    return true;
  }
  const me = await getMe();
  if (!me) {
    Cookies.remove('token');
    return true;
  }
  return false;
}

export function RedirectComponent() {
  setTimeout(() => window.location = '/login', 2000);
  return (
    <>
      <h2 className="text-lg font-bold h-50">
        O usuário não está logado, redirecionando para página de <a href='/login' className='text-sky-400 dark:text-blue-700 hover:text-blue-400'>login</a>.
      </h2>
    </>
  )
}

export function logout() {
  Cookies.remove('token');
  window.location = '/cadastrar';
}
