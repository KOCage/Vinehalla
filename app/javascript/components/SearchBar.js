import React, {useState, useContext, useEffect } from "react"
import { Context } from "./GlobalState/Store"

function SearchBar () {
    const [searchTitle, setSearchTitle ] = useState("")
    const [searchAuthor, setSearchAuthor ] = useState("")
    const [searchTags, setSearchTags ] = useState("")
    const [searchDialogue, setSearchDialogue ] = useState("")
    const [state, dispatch ] = useContext(Context)
    let searchResultsArray = []
    let searching = false;

    function performSearch()
    {
        let { url, count } = urlBuilder(searchTitle, searchAuthor, searchTags, searchDialogue)
        if (count === 0)
            return
        console.log("URL: ", url)
        fetchResults(url)
        searching = true;
    }

    useEffect(() => {
        if (searching) {
            dispatch({ type: "UPDATE_SEARCH_RESULTS", payload: searchResultsArray })
            searching = false
        } 
    }, [searchResultsArray])

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


const fetchResults = (url) => {
    fetch(url)
    .then((response) => {
        console.log("Got response")
        return response.json()
    })
    .then((data) => {
        console.log("Processing response data")
        console.log(data)
        console.log("Data length: ", data.length)
        return getResultIds(data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const getResultIds = (vineData) => {
    console.log("Getting the result ids")
    let searchResultsArray = vineData.map(vine => vine.id)
    console.log("Search results: ", searchResultsArray)
    return searchResultsArray
}

const urlBuilder = (title, author, tags, dialogue) => {
            console.log("Building the URL to search")
            let url = "./vines/search?"
            let count = 0
            if (title != "")
            {
                let searchTitle = encodeURIComponent(title)
                url += "title=" + searchTitle
                count++
            }
            if (author != "")
            {
                if (count > 0)
                    url += "&"
                let searchAuthor = encodeURIComponent(author)
                url += "author=" + searchAuthor
                count++
            }
            if (tags != "")
            {
                if (count > 0)
                    url += "&"
                let searchTags = encodeURIComponent(tags)
                url += "tags=" + searchTags
                count++
            }
            if (dialogue != "")
            {
                if (count > 0)
                    url += "&"
                let searchDialogue = encodeURIComponent(dialogue)
                url += "dialogue=" + searchDialogue
                count++
            }
            return { url: url, count: count }
}

export default SearchBar