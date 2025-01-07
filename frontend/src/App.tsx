import { useEffect, useState } from 'react';
import './App.css';
import Notifications from './components/elements/notifications';
import { CheckAuth, GetList } from '../wailsjs/go/backend/App';
import NoAuthView from './views/no-auth';
import ListView from './views/list-view';
import { EventsOn } from '../wailsjs/runtime/runtime';

function App() {

    // Check if user has user credentials submitted
    const [canAuth, setCanAuth] = useState<boolean>();
    const [fixtures, setFixtures] = useState<any[]>([]);

    useEffect(() => {
        checkAuth();

        EventsOn("authChange", () => {
            checkAuth();
        })
    }, [])

    useEffect(() => {
        if (canAuth) {
            getList()
        }
    }, [canAuth]);

    const checkAuth = async () => {
        setCanAuth(await CheckAuth());
    }

    const getList = async () => {
        console.log("getList", await GetList());
        setFixtures(await GetList())
    }

    return (
        <div id="App">
            <Notifications />
            { !canAuth && <NoAuthView /> }
            { canAuth && fixtures && <ListView fixtures={fixtures} /> }
            <div>Hello World</div>
        </div>
    )
}

export default App
