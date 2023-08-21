import React, { FC } from "react";
import { Button } from "@mui/material";
import { useBabySitterContext } from "../../../BabySitterContext";

export const ShowPendingButton: FC = () => {
    const { setShowStarted } = useBabySitterContext();
    return (<Button onClick={setShowStarted} variant="contained">Start Show</Button>)
    //return (<Typography variant="h4"><div onClick={setShowStarted}>Babysitter 2.0</div></Typography>)
}