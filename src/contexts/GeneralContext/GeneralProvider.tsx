import { Snackbar, Stack, Alert } from "@mui/material";
import uniqid from 'uniqid';
import React, { useState, FC, PropsWithChildren, useCallback } from "react";
import GeneralContext from "./GeneralContext";
import { GeneralContextInterface, NotificationInterface } from "./interfaces";

const GeneralProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [ notifications, setNotifications ] = useState<GeneralContextInterface['notifications']>([]);

    const onClose = useCallback((id: string, reason: string) => {
        if (reason !== 'clickaway') {
            setNotifications(prevState => prevState.filter(notification => notification.id !== id));
        }
    }, []);

    const showNotification = useCallback((notification: Omit<NotificationInterface, 'id'>) => {
        setNotifications(prevState => [
            ...prevState,
            { id: uniqid(), ...notification },
        ]);
    }, []);

    return (
        <GeneralContext.Provider
            value={{
                notifications,
                showNotification,
            }}
        >
            <Stack>
                { notifications.map((notification, idx) => (
                    <Snackbar
                        key={notification.id}
                        autoHideDuration={notification.autoHide}
                        open={true}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        onClose={(event, reason) => onClose(notification.id, reason)}
                        style={{ top: idx > 0 ? `${idx * 50 + 10}px` : '10px' , } }
                    >
                        <Alert severity={notification.type}>
                            { notification.message } 
                        </Alert>
                    </Snackbar>
                ))}
            </Stack>
            { children }
        </GeneralContext.Provider>
    )
}

export default GeneralProvider;