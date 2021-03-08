import React, { useContext } from "react"
import { Context } from "./GlobalState/Store"

function SelectedVine (props) {
    const [ state, dispatch ] = useContext(Context)

    function moveUp(e) {
        e.preventDefault()
        dispatch({type: "MOVE_TARGET_UP", payload: props.vine})
    }

    function moveDown(e) {
        e.preventDefault()
        dispatch({type: "MOVE_TARGET_DOWN", payload: props.vine})
    }

    function removeVine(e) {
        e.preventDefault()
        dispatch({type: "REMOVE_TARGET", payload: props.vine})
    }

    return (
        <div className = "selectedVine" >
            <center><button onClick={moveUp} >Move Up</button></center>
            <br/>
            <button onClick={removeVine}>DELETE</button>
            <br/>
            <center>Selected Vine { props.vine.id }</center>
            <br/>
            <center>Title: { props.vine.title }</center>
            <br/>
            <center><button onClick={moveDown} >Move Down</button></center>
        </div>
    )
}

export default SelectedVine