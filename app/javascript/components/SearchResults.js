import React, {useContext, useEffect} from "react"
import { Context } from "./GlobalState/Store"
import VineSearchResult from "./VineSearchResult.js"

function SearchResults() {
    const [state, dispatch] = useContext(Context)

    let searchResults = state.searchResults.map(vineId => <VineSearchResult key={vineId} 
                                                                        vineId={vineId}/>
                                                )
    
    useEffect(() => {
        searchResults = state.searchResults.map(vineId => <VineSearchResult key={vineId} 
                                                                        vineId={vineId}/>
                                                )
    }, [state.searchResults])


    return (
        <div className = "searchResults">
            { searchResults }
        </div>
    )
}

export default SearchResults