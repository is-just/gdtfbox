import { useState } from "react";
import { SaveCredentials, SetNotification } from "../../wailsjs/go/backend/App";

const NoAuthView = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const [checkCredentials, setCheckCrednetials] = useState(false);

    const saveCredentials = async () => {
        setCheckCrednetials(true);
        const result = await SaveCredentials(user, password);
        setCheckCrednetials(false);
        
        if(!result) {
            SetNotification("Something went wrong!")
        };
    }

    return (
        <div>
            <div>No Auth</div>
            <div className="grid grid-cols-3 gap-5 px-5">
                <div>
                    <label htmlFor="user" className="basic-label">User</label>
                    <input id="user" type="string" value={user} onChange={(e) => setUser(e.target.value)} placeholder="User" className="basic-input" />
                </div>

                <div>
                    <label htmlFor="password" className="basic-label">Password</label>
                    <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="basic-input" />
                </div>

                <div className="flex items-end">
                    <button onClick={saveCredentials} disabled={checkCredentials} className="basic-button w-full">Save credentials</button>
                </div>
            </div>
        </div>
    )
}

export default NoAuthView;