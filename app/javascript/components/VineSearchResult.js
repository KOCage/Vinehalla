import React, { useContext } from "react"
import { Context } from "./GlobalState/Store"

function VineSearchResult (props) {
    const [state, dispatch] = useContext(Context)
    const {image_path, title, author, tags, dialogue} = props.vine

    let image = null
    if (image_path &&
        image_path !== "") {
            console.log(`Generating image for search result ${image_path}`)
            image = <img className="searchResultImage" src={`file://${image_path}`}/>
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
                    Title: { title } <br/>
                    Author: { author } <br/>
                    Tags: { tags } <br/>
                </div>
                <div className="searchResultDialogue">
                    { dialogue}
                </div>
                <button className="selectSearchResult" onClick={selectVine}>{">>"}</button>

            </div>
        )
}

export default VineSearchResult