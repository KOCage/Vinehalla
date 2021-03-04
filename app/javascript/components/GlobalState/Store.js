import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'
import SearchEngine from "./SearchEngine"

const initialState = {
    selectedVines: [0,4,2,8,7,5],
    searchEngine: new SearchEngine()
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;