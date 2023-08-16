import {Navigate} from 'react-router-dom'

const PrivateRouter = ({children}) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem("password");

    return ( 
        <div>
            {
                username && password ? children : <Navigate to = '/login'/>
            }
        </div>
    )
}

export default PrivateRouter;