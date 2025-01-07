import { useState } from "react";
import { SaveCredentials, SetNotification } from "../../wailsjs/go/backend/App";

const NoAuthView = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const saveCredentials = async () => {
        const result = await SaveCredentials(user, password)
        
        if(!result) {
            SetNotification("Something went wrong!")
        };
    }

    return (
        <div>
            <div>No Auth</div>
            <div>
                <label htmlFor="user">User</label>
                <input id="user" type="string" value={user} onChange={(e) => setUser(e.target.value)} placeholder="User" />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>

            <div>
                <button onClick={saveCredentials}>Save credentials</button>
            </div>
        </div>
    )
}

export default NoAuthView;