import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { InputPanelForm, InputPanelInner, SendBtn } from "./styles";
import { InputPanelProps, InputPanelData } from "./interface";

const InputPanel: FC<InputPanelProps> = ({ onSubmit }) => {
    const {
        reset,
        register,
        handleSubmit,
    } = useForm<InputPanelData>({ mode: 'onChange' });

    const handleOnSubmit: SubmitHandler<InputPanelData> = (data) => {
        reset();
        onSubmit(data.message);
    }

    return (
        <InputPanelForm onSubmit={handleSubmit(handleOnSubmit)}>
            <InputPanelInner>
                <TextField
                    variant="standard"
                    placeholder="Начните печатать сообщение..."
                    size="medium"
                    fullWidth
                    { ...register(
                        'message',
                        { required: true }
                    )}
                />
                <SendBtn
                    type="submit"
                    variant="contained"
                >
                    <Send />
                </SendBtn>
            </InputPanelInner>
        </InputPanelForm>
    )
}

export default InputPanel;