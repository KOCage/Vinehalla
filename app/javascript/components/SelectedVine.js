import React, { useContext } from "react"
import { Context } from "./GlobalState/Store"

function SelectedVine (props) {
    const [ state, dispatch ] = useContext(Context)

    function moveUp(e) {
        e.preventDefault()
        dispatch({type: "MOVE_TARGET_UP", payload: props.vineId})
    }

    function moveDown(e) {
        e.preventDefault()
        dispatch({type: "MOVE_TARGET_DOWN", payload: props.vineId})
    }

    function removeVine(e) {
        e.preventDefault()
        dispatch({type: "REMOVE_TARGET", payload: props.vineId})
    }

    return (
        <div className = "selectedVine" >
            <top><center><button onClick={moveUp} >Move Up</button></center></top>
            <button onClick={removeVine}>DELETE</button>
            <center>Selected Vine { props.vineId }</center>
            <bottom><center><button onClick={moveDown} >Move Down</button></center></bottom>
        </div>
    )
}

export default SelectedVine