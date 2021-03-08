import React, {useState} from "react"

function SearchForm(props) {
    const [searchTitle, setSearchTitle ] = useState("")
    const [searchAuthor, setSearchAuthor ] = useState("")
    const [searchTags, setSearchTags ] = useState("")
    const [searchDialogue, setSearchDialogue ] = useState("")

    // Might want to change what type of input each field has, so I'm abstracting the state update
    function updateSearchTitle(e) {
        e.preventDefault()
        setSearchTitle(e.target.value)
    }

    function updateSearchAuthor(e) {
        e.preventDefault()
        setSearchAuthor(e.target.value)
    }

    function updateSearchTags(e) {
        e.preventDefault()
        setSearchTags(e.target.value)
    }

    function updateSearchDialogue(e) {
        e.preventDefault()
        setSearchDialogue(e.target.value)
    }

    function handleClick(e)
    {
        e.preventDefault()
        props.handleSearch(searchTitle, searchAuthor, searchTags, searchDialogue)
    }

    return (
        <div className = "searchForm">
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
                    <td><button onClick={handleClick} >Submit</button></td>
                    </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    )
}

export default SearchForm