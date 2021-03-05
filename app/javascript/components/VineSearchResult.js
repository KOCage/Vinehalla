import React from "react"

function VineSearchResult (props) {

    return (
            <div className = "vineSearchResult">
                { props.vine.title }
            </div>
        )
}

export default VineSearchResult