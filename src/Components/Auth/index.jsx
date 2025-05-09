
import { useMatch } from 'react-router-dom'
import Cookies from 'js-cookie'
import api from '@Controllers/api'


const loggedPages = ['/', '/compras'];

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

export function willRedirectToLogin() {
  const needToBeLogged = loggedPages.filter((page) => useMatch(page) != null).length > 0;
  if (needToBeLogged) {
    const token = Cookies.get('token');
    if (!token) {
      return true;
    }
  }
  return false;
}

export function RedirectComponent() {
  setTimeout(() => window.location = '/login', 2000);
  return (
    <>
      <h2 className="text-lg font-bold">O usuário não está logado, redirecionando para página de <a href='/login' className='text-sky-400 dark:text-blue-700 hover:text-blue-400'>login</a>.
      </h2>
    </>
  )
}

export function logout() {
  Cookies.remove('token');
  window.location = '/cadastrar';
}
