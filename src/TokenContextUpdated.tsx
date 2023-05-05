import React, {Dispatch, SetStateAction} from "react";
import {createContext, useEffect, useState} from "react";
import {fetchNewToken} from "./allFetchesUpdated";
import TokenUpdate from "./ThePageOfEverything";


interface ITokenContext {
    token: string
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const TokenContextUpdated = createContext<ITokenContext>({
        token: "",
        setToken: () => {
        }
    }
);

function TokenProviderUpdated() {
    const [token, setToken] = useState("");
    useEffect(() => {
        fetchNewToken()
            .then((newToken) => {
                setToken(newToken)
                console.log("token=" + newToken);
                localStorage.setItem("token", newToken);
            })
            .catch((error) => console.error(error));
    }, [])


    return (
        <TokenContextUpdated.Provider value={{token, setToken}}>
            <TokenUpdate/>
        </TokenContextUpdated.Provider>
    );
}

export default TokenProviderUpdated
