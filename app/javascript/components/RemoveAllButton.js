import React, { useContext } from "react"
import { Context } from "./GlobalState/Store"

function RemoveAllButton () {
    const [state, dispatch] = useContext(Context)

    function handleClick(e) {
        e.preventDefault()
        dispatch({type: "REMOVE_ALL_TARGETS", payload: 5})
    }

    return (
        <div className = "removeAllButton">
            <top><center><button onClick={handleClick}>Remove All</button></center></top>
        </div>
    )
}

export default RemoveAllButton