export interface FormDataInterface {
    username: string
}
export interface ServerError {
    fieldID: string,
    message: string,
}
export interface AuthFormProps {
    loading: boolean,
    onSubmit: (data: FormDataInterface) => void,
    clearCustomError: () => void,
    customError: ServerError | null,
}