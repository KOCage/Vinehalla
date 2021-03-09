import React, { useContext } from "react"
import { Context } from "./GlobalState/Store"

function VineSearchResult (props) {
    const [state, dispatch] = useContext(Context)
    const {title, author, tags, dialogue, image_source} = props.vine

    const vine_image = new Image()
    vine_image.src = 'data:image/jpg;base64,' + image_source
    const searchResultImage = React.createElement("img", {
        src: vine_image.src,
        width: "100%"
    }, null)

    function selectVine(e)
    {
        e.preventDefault;
        dispatch({type: "ADD_TARGET", payload: props.vine})
    }

    return (
            <div className = "vineSearchResult">
                <div className="searchResultDetails">
                    Title: { title } <br/>
                    Author: { author } <br/>
                    Tags: { tags } <br/>
                </div>
                <div className="searchResultDialogue">
                    { dialogue}
                </div>
                <div className="searchResultImage">
                    { searchResultImage }
                </div>
                <button className="selectSearchResult" onClick={selectVine}>{">>"}</button>

            </div>
        )
}

export default VineSearchResult