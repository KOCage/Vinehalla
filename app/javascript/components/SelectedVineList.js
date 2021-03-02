import React, {setState, useEffect, useContext } from "react"
import SelectedVine from "./SelectedVine.js"
import { Context } from "./GlobalState/Store"

function SelectedVineList () {
    const [state, dispatch] = useContext(Context)

    let selectedVines = state.selectedVines.map(vineId => <SelectedVine key={vineId} 
                                                                        vineId={vineId}/>
                                                )
    
    useEffect(() => {
        selectedVines = state.selectedVines.map(vineId => <SelectedVine key={vineId} 
                                                                        vineId={vineId}/>
                                                )
    }, [state.selectedVines])

    return (
        <div className = "selectedVineList">
            <center>
                { selectedVines }
            </center>
        </div>
    )
}

export default SelectedVineList