import React from "react"
import TopBar from "./TopBar"
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

function LeftFrame() {

    return (
        <div className = "leftFrame">
            <TopBar />
            <SearchBar />
        </div>
    )
}

export default LeftFrame