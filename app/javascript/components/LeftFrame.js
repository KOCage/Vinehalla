import React from "react"
import TopBar from "./TopBar"
import SearchArea from "./SearchArea"

function LeftFrame() {

    return (
        <div className = "leftFrame">
            <TopBar />
            <SearchArea />
        </div>
    )
}

export default LeftFrame