import React, {useState, useContext } from "react"
import { Context } from "./GlobalState/Store"

function SearchBar () {
    const [searchTitle, setSearchTitle ] = useState("")
    const [searchAuthor, setSearchAuthor ] = useState("")
    const [searchTags, setSearchTags ] = useState("")
    const [searchDialogue, setSearchDialogue ] = useState("")
    const [state, dispatch ] = useContext(Context)

    function performSearch()
    {
        // Gonna do some searching and update the context
        let searchPayload = { title: searchTitle, 
                        author: searchAuthor,
                        tags: searchTags,
                        dialogue: searchDialogue
                        }
        dispatch({type: "PERFORM_SEARCH", payload: searchPayload })
    }

    // Might want to change what type of input each field has, so I'm abstracting the state update
    function updateSearchTitle(e) {
        e.preventDefault
        setSearchTitle(e.target.value)
    }

    function updateSearchAuthor(e) {
        e.preventDefault
        setSearchAuthor(e.target.value)
    }

    function updateSearchTags(e) {
        e.preventDefault
        setSearchTags(e.target.value)
    }

    function updateSearchDialogue(e) {
        e.preventDefault
        setSearchDialogue(e.target.value)
    }

    return (
        <div className = "searchBar">
            <table>
                <thead></thead>
                <tbody>
                    <tr>
                    <td><label >Title:</label></td>
                    <td><input id="searchTitleInput" placeholder="Title"
                        onChange = {updateSearchTitle}></input></td>
                    </tr>
                    <tr>
                    <td><label >Author:</label></td>
                    <td><input id="searchAuthorInput" placeholder="Author"
                        onChange = {updateSearchAuthor}></input></td>
                    </tr>
                    <tr>
                    <td><label >Tags:</label></td>
                    <td><input id="searchTagsInput" placeholder="Tags"
                        onChange = {updateSearchTags}></input></td>
                    </tr>
                    <tr>
                    <td><label >Dialogue:</label></td>
                    <td><textarea id="searchDialogueInput" placeholder="Dialogue"
                        onChange = {updateSearchDialogue} rows="3" columns="50" className="searchDialogue"></textarea></td>
                    </tr>
                    <tr>
                    <td><button onClick={performSearch} >Submit</button></td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

export default SearchBar