import React, {createContext, useContext, useState} from "react";
export interface BabySitterContextProviderProps {
    children: React.ReactChild;
    anyAdditionalFunctions: () => void | undefined;
}
interface BabySitterContextValue {

};

const BabySitterContext = createContext<BabySitterContextValue>({});
export const BabySitterContextProvider: React.FC<BabySitterContextProviderProps> = ({children, anyAdditionalFunctions}) => {
    return (<BabySitterContext.Provider value={{}}>
        {children}
    </BabySitterContext.Provider>)
}

export const useBabySitterContext = () => {
    const value = useContext(BabySitterContext);
    return value;
}
//export const BabySitterContext = () => {}