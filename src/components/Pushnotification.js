import { useCookies } from 'react-cookie';
import * as serviceWorker from '../serviceWorker';
import { subscribeUser } from '../subscription';
const Pushnotification = () => {
    const [cookies, setCookie] = useCookies();
    var mycookID = cookies.userid;
    useEffect(() => {
        if (cookies.userid) {
            serviceWorker.register();
            subscribeUser(mycookID)
        }
    }, [])
    return (
        <div style={{ marginTop: '150px' }}>
            Hello world.
        </div>
    )
}
export default Pushnotification;