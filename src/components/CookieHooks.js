import { useCookies } from 'react-cookie';
function useCookieHooks() {
  const [cookies, setCookie] = useCookies(['userid']);
  let cookievalue = cookies.userid;
  return cookievalue;
}
export default useCookieHooks;