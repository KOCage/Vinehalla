import React, { useContext } from "react"
import { Context } from "./GlobalState/Store"

function SelectedVine (props) {
    const [ state, dispatch ] = useContext(Context)
    const {image_source, title } = props.vine

    const vine_image = <img className = "selectedVineImage" src={'data:image/jpg;base64,' + image_source} width="100%"/>

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
            { vine_image }
            <div className = "selectedVineTitle"> 
                { title }
            </div>
            <button className = "moveVineUpButton" onClick={moveUp} >Move Up</button>
            <button className = "deleteVineButton" onClick={removeVine}>X</button>
            <button className = "moveVineDownButton" onClick={moveDown} >Move Down</button>
        </div>
    )
}

export default SelectedVine