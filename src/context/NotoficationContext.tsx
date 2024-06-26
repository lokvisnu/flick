import React, { useEffect } from 'react';
import { StyleSheet, Touchable, TouchableWithoutFeedback, View } from 'react-native';
import NotificationPanel from '../components/Notification';
type Props = {
    children: React.ReactNode;
}
export type NotificationContextType = {
    show: (message: string, type: TYPE, duration: number, opacity: number, position: POS, children?: React.ReactNode, autoHide?: boolean) => void;
    hide: () => void;

}
interface Notification {
    message: string,
    type: TYPE,
    opacity: number,
    position: POS,
    children?: React.ReactNode,
    autoHide: boolean
}
const NotificationContext = React.createContext({});
type POS = 'TOP' | 'BOTTOM' | 'CENTER';
type TYPE = 'INFO' | 'ERROR' | 'CUSTOM';
const NotificationProvider = ({ children }: Props) => {
    const [notification, setNotification] = React.useState<Notification[]>([]);
    const show = (message: string,
        type: TYPE,
        opacity: number = 0.5,
        position: POS,
        children?: React.ReactNode,
        autoHide: boolean = true) => { // show notification
        setNotification([...notification, {
            message,
            type,
            opacity,
            position,
            children,
            autoHide
        }]); // add notification to the list
    }
    const hide = () => { // hide notification
        setNotification(notification.slice(1)); // remove the first notification from the list
    }

    const styles = StyleSheet.create({
        parentContainer: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 1,
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: notification.length ? 'flex' : 'none' // toggle the notification visibility
        }

    })
    return (
        <NotificationContext.Provider value={{ showNotification:show, hideNotification:hide }}>
            <TouchableWithoutFeedback onPress={hide}>
                <View style={styles.parentContainer}>
                    {
                        notification.length > 0 &&
                        <NotificationPanel
                            autoHide={notification[0].autoHide} // auto hide notification
                            notificationChild={notification[0].children} // custom notification 
                            position={notification[0].position} // position of notification
                            type={notification[0].type} // type of notification
                            opacity={notification[0].opacity} // opacity of notification
                            message={notification[0].message} // message to show in notification
                            hide={hide}
                        />
                    }
                </View>
            </TouchableWithoutFeedback>
            {children}
        </NotificationContext.Provider>
    );
}

export { NotificationProvider, NotificationContext }