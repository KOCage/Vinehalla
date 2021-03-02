import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    selectedVines: [0,4,2,8,7,5],
    searchResults: [1,2,3,4,5,6,7,8,9]
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