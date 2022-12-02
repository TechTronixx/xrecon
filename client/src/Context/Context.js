import React, { useState } from 'react'

export const Context = React.createContext();

const ContextProvider = (props) => {
    const [user, setUser] = useState(null);

    return (
        <Context.Provider value={{
            user,
            setUser,
        }}>
            {props.childern}
        </Context.Provider>
    )
}

export default ContextProvider;
