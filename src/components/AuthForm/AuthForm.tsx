import React, { FC } from "react";
import { Grid } from "@mui/material";
import ContainerFullHeight from "../styles/ContainerFullHeght";
import GridFullHeight from "../styles/GridFullHeght";

const AuthForm: FC = () => {
    return (
        <ContainerFullHeight fixed>
            <GridFullHeight
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <div>www</div>
                </Grid>
            </GridFullHeight>
        </ContainerFullHeight>
    )
}

export default AuthForm;