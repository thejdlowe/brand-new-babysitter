import React, {createContext, useContext, useState, useEffect} from "react";
import { PlayerList } from "../../data/players";
export interface BabySitterContextProviderProps {
    children?: React.ReactChild;
    anyAdditionalFunctions?: () => void | undefined;
}
type BabySitterPlayer = Record<string, boolean>;
interface BabySitterContextValues {
    players: BabySitterPlayer;
};

const BabySitterContext = createContext<BabySitterContextValues>({players: {}});
export const BabySitterContextProvider: React.FC<BabySitterContextProviderProps> = ({children, anyAdditionalFunctions}) => {
    const [playersAll, setActivePlayer] = useState({});
    const [activePlayers, setListOfPlayers] = useState([]);

    const buildInitialPlayers = () => {
        let players:BabySitterPlayer = {};
        PlayerList.forEach(player => {
            const key = `${player}`;
            players[key] = true;
            
        });
        setActivePlayer(players)
    };
    
    useEffect(() => {
        buildInitialPlayers();
    }, [])

    /*
    useEffect(() => {
        console.log(playersAll);
    }, [playersAll])*/

    return (<BabySitterContext.Provider value={{players: playersAll}}>
        {children}
    </BabySitterContext.Provider>)
}

export const useBabySitterContext = () => {
    const value = useContext(BabySitterContext);
    return value;
}