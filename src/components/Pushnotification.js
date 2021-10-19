//import addNotification from 'react-push-notification';

import { subscribeUser } from '../subscription';

const Pushnotification = () => {
    
    
    subscribeUser()

    return (
        <div style={{marginTop:'150px'}}>
            
           Hello world.
          
        </div>
    )
}
export default Pushnotification;