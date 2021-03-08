import React, { useContext } from "react"
import { Context } from "./GlobalState/Store"

function VineSearchResult (props) {
    const [state, dispatch] = useContext(Context)
    let image = null
    if (props.vine.image_path &&
        props.vine.image_path !== "") {
            console.log(`Generating image for search result ${props.vine.image_path}`)
            image = <img className="searchResultImage" src={`file://${props.vine.image_path}`}/>
        }

    function selectVine(e)
    {
        e.preventDefault;
        dispatch({type: "ADD_TARGET", payload: props.vine})
    }

    return (
            <div className = "vineSearchResult">
                {image}
                <div className="searchResultDetails">
                    Title: { props.vine.title } <br/>
                    Author: { props.vine.author } <br/>
                    Tags: {props.vine.tags } <br/>
                </div>
                <div className="searchResultDialogue">
                    { props.vine.dialogue}
                </div>
                <button className="selectSearchResult" onClick={selectVine}>{">>"}</button>

            </div>
        )
}

export default VineSearchResult