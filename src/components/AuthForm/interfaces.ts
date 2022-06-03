export interface FormDataInterface {
    username: string
}
export interface AuthFormProps {
    loading: boolean,
    onSubmit: (data: FormDataInterface) => void,
}