//import addNotification from 'react-push-notification';
import { subscribeUser } from '../subscription';
//import * as serviceWorker from '../serviceWorker';
const Pushnotification = () => {
   //serviceWorker.register();    
    subscribeUser()
    return (
        <div style={{marginTop:'150px'}}>
           Hello world.
        </div>
    )
}
export default Pushnotification;