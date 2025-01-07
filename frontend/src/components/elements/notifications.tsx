import { ReactNode, useEffect, useState } from "react";
import { EventsOn } from '../../../wailsjs/runtime/runtime';

const Notifications = () => {
    const NOTIFICATION_DELAY = 5000;
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        // Reset notification after 
        if(notification !== '') {
            setTimeout(() => {       
                setNotification(null);
            }, NOTIFICATION_DELAY)
        }
    }, [notification]);

    // Initial notification subscription
    useEffect(() => {
        EventsOn('notification', (value) => {
            setNotification(value.value);
        });
    }, []);
    
    return (
        <div>
            { notification && (
                <div>
                    <div>{ notification }</div>
                </div>
            ) }
        </div>
    )
}

export default Notifications;