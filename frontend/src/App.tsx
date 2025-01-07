import { ReactNode, useEffect, useState } from 'react';
import './App.css';
import Notifications from './components/elements/notifications';
import { CheckAuth, Greet } from '../wailsjs/go/backend/App';
import NoAuthView from './views/no-auth';

function App() {

    // Check if user has user credentials submitted
    const [canAuth, setCanAuth] = useState<boolean>();

    useEffect(() => {
        checkAuth();
    }, [])

    const checkAuth = async () => {
        setCanAuth(await CheckAuth());
    }

    return (
        <div id="App">
            <Notifications />
            { !canAuth && <NoAuthView /> }
            <div>Hello World</div>
        </div>
    )
}

export default App
