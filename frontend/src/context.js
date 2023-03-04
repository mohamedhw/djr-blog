import React, {createContext, useContext, useState, useEffect} from "react";

export const FeatchContext = createContext(null)


export const FeatchProvider = ({children}) => {



    return (
        <FeatchContext.Provider value={''}>
            {children}
        </FeatchContext.Provider>
    )
}