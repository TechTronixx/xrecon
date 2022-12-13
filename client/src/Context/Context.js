import React, { useState } from 'react'

export const Context = React.createContext();

const ContextProvider = (props) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [forceUpdate, setForceUpdate] = useState(0);

    return (
        <Context.Provider value={{
            user,
            setUser,
            token,
            setToken,
            forceUpdate,
            setForceUpdate
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
