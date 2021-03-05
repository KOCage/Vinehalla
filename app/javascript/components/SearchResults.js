import React from "react"
import VineSearchResult from "./VineSearchResult"

function SearchResults(props) {
    let searchResultComponents = ""

    if (!props.searchPerformed) { // If we have never performed a search, maintain a blank search result set  
        searchResultComponents = ""

    } else if (props.performingSearch) { // if we are in the process of searching, state loading
        searchResultComponents = "Loading..."
        
    } else if (props.searchResults) { // if we are not in the process of searching and we did get results, create them
        searchResultComponents = props.searchResults.map(vine => <VineSearchResult key={vine.id} vine={vine}/>)
    } else { // if we got no results back from the completed search, state no results found
        searchResultComponents = "No results found" 
    }
    
    return (
        <div className = "searchResults">
            { searchResultComponents }
        </div>
    )
}

export default SearchResults