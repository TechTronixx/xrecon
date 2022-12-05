import React, { useState } from 'react'

export const Context = React.createContext();

const ContextProvider = (props) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    return (
        <Context.Provider value={{
            user,
            setUser,
            token,
            setToken
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
