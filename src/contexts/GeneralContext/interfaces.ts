import { AlertProps } from "@mui/material";


export interface NotificationInterface {
    id: string,
    autoHide: number,
    type: AlertProps['severity'],
    message: string,
}
export interface GeneralContextInterface {
    notifications: NotificationInterface[],
    showNotification: (notification: Omit<NotificationInterface, 'id'>) => void,
}