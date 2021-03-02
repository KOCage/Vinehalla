import React from "react"
import LeftFrame from "./LeftFrame"
import RightFrame from "./RightFrame"
import Store from "./GlobalState/Store"

function VinehallaWindow() {

    return (
        <div className = "vinehallaWindow">
            <Store>
                <LeftFrame /><RightFrame />
            </Store>
        </div>
    )
}

export default VinehallaWindow