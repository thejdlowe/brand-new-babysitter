import React, { FC } from "react";
import { Typography } from "@mui/material";
import { useBabySitterContext } from "../../../BabySitterContext";

export const Status: FC = () => {
    const { setShowStarted } = useBabySitterContext();
    return (<Typography variant="h4"><div onClick={setShowStarted}>Babysitter 2.0</div></Typography>)
}