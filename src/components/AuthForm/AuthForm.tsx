import React, { FC, useMemo } from "react";
import { Grid } from "@mui/material";
import { Typography, TextField, InputAdornment, } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { InputWrap } from "./styles";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { FormDataInterface, AuthFormProps } from './interfaces';
import ButtonLoading from "../UI/ButtonLoading";
import GridFullHeight from "../styles/GridFullHeght";

const AuthFormHeader: FC = () => {
    return (
        <Grid item>
            <Typography
                align={'center'}
                variant={'h4'}
            >
                SimpleChat
            </Typography>
            <Typography
                align={'center'}
                variant={'subtitle1'}
            >
                Чат с использыванием Nodejs и Reactjs
            </Typography>
        </Grid>
    )
}

const AuthForm: FC<AuthFormProps> = ({ onSubmit, loading }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormDataInterface>({ mode: 'onChange' });
    const { dirtyFields, isSubmitted } = useFormState({ control });
    const inputIcons = useMemo(() => {
        return (dirtyFields.username || isSubmitted) &&
            (!errors.username ? <CheckCircle /> : <Cancel/>);
    }, [ dirtyFields.username, errors.username, isSubmitted, ]);

    const onSubmitForm: SubmitHandler<FormDataInterface> = data => onSubmit(data);

    return (
        <GridFullHeight
            container
            justifyContent="center"
            alignItems="center"
            direction={'column'}
            rowSpacing={2}
            sx={{ paddingY: 2 }}
        >
            <AuthFormHeader />
            <Grid item style={{ maxWidth: '100%' }}>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <InputWrap>
                        <>
                            <TextField
                                id="username"
                                label={'Никнейм'}
                                fullWidth
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position={'end'}>
                                            { inputIcons }
                                        </InputAdornment>
                                    )
                                }}
                                {
                                    ...register(
                                        'username',
                                        {
                                            required: 'Поле обязательно для заполнения',
                                            minLength: {
                                                value: 3,
                                                message: 'Минимальная длинна 3 символа',
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: 'Максимальная длинна 10 символов'
                                            },
                                        }
                                    )
                                }
                            />
                            <ButtonLoading
                                sx={{ mt: 2 }}
                                color={'primary'}
                                variant={'contained'}
                                type={'submit'}
                                disabled={!!errors.username}
                                fullWidth
                                loading={loading}
                            >
                                Перейти в чат
                            </ButtonLoading>
                        </>
                    </InputWrap>
                </form>
            </Grid>
        </GridFullHeight>
    )
}

export default AuthForm;

export {
    AuthFormHeader,
}