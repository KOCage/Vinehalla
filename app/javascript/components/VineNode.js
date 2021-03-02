import React from "react"

function VineNode(props) {
    return (
        <div className="parent-tile">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR88pXw07lc2YXxoR8Ze9ipCzEgHyQ7zH4hLg&usqp=CAU" className = "vineScreenshot" />
            Vine: {props.vine.id} - {props.vine.name}
        </div>   
    )
}

export default VineNode