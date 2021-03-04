import React, {useContext, useEffect} from "react"
import { Context } from "./GlobalState/Store"
import VineSearchResult from "./VineSearchResult.js"

function SearchResults() {
    const [state, dispatch] = useContext(Context)
    let searchResults = ""

    function buildSearchResults(results)
    {
        searchResults = results.map(vine => <VineSearchResult key={vine.Id} 
                                                            vineId={vine.Id}/>)
    }

    if (state.searchEngine.searchResults) { 
        buildSearchResults(state.searchEngine.searchResults)
    }  
    
    useEffect(() => {
        if (state.searchEngine.searchResults)
            buildSearchResults(state.searchEngine.searchResults)
        else
            searchResults = "No results found"
    }, [state.searchEngine.searchResults])


    return (
        <div className = "searchResults">
            { searchResults }
        </div>
    )
}

export default SearchResults