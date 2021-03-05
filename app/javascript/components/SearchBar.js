import React, {useState} from "react"
import SearchForm from "./SearchForm"
import SearchResults from "./SearchResults"

function SearchBar () {
    const [searchResults, setSearchResults] = useState([])
    const [performingSearch, setPerformingSearch] = useState(false)
    const [searchPerformed, setSearchPerformed] = useState(false)

    function handleSearch(searchTitle, searchAuthor, searchTags, searchDialogue)
    {
        performSearch(searchTitle, searchAuthor, searchTags, searchDialogue)
    }

    return (
        <div>
            <SearchForm handleSearch={handleSearch} />
            <SearchResults searchResults={searchResults} performingSearch={performingSearch} searchPerformed={searchPerformed}/>
        </div>
    )

    function performSearch(searchTitle, searchAuthor, searchTags, searchDialogue) {

        let { url, count } = urlBuilder(searchTitle, searchAuthor, searchTags, searchDialogue)
        if (count === 0)
            return
            
        console.log("URL: ", url)
        if (!searchPerformed)
            setSearchPerformed(true)
        setPerformingSearch(true)
        fetchResults(url)
    }
    
    function fetchResults(url) {
        fetch(url)
        .then((response) => {
            console.log("Got response")
            return response.json()
        })
        .then((data) => {
            console.log("Processing response data")
            console.log(data)
            console.log("Data length: ", data.length)
            setSearchResults(data)
            setPerformingSearch(false)
        })
        .catch((err) => {
            console.log(err)
            setSearchResults([])
        })
    }
    
    function urlBuilder(title, author, tags, dialogue) {
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
}

export default SearchBar