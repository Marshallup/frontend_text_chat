import React, { FC, PropsWithChildren } from 'react';
import { ButtonEl, CircElWrap } from './styles';
import { CircularProgress } from '@mui/material';
import { ButtonLoadingProps } from './interface';

const ButtonLoading: FC<PropsWithChildren<ButtonLoadingProps>> = ({
    children,
    loading,
    disabled,
    ...props
}) => {
    return (
        <ButtonEl
            disabled={disabled || loading}
            $loading={loading}
            { ...props }
        >   
            <CircElWrap $loading={loading}>
                <CircularProgress size={'1.75em'} />  
            </CircElWrap>
            { children }
        </ButtonEl>
    )
}

export default ButtonLoading;