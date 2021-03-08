import React, { useContext } from "react"
import { Context } from "./GlobalState/Store"

function GenerateCompilationButton () {
    const [state, dispatch] = useContext(Context)

    function requestCompilation(e)
    {
        e.preventDefault()
        console.log(state.selectedVines)
        let url = urlBuilder(state.selectedVines)
        console.log(url)

        // This calls the resulting URL (a call to the ruby code with the desired vine ids) and that leads to the browser download
        window.location = url
        
    }

    return (
        <div className = "generateCompilationButton">
            <center><button onClick={requestCompilation}>Generate Compilation</button></center>
        </div>
    )
}

function urlBuilder(vinesArray) {
    console.log("Building the URL to compile vines")
    let url = "./vines/requestCompilation?vineArray="
    let searchArray = ""
    let count = 0;
    vinesArray.forEach(vine => {
        if (count > 0)
            searchArray += ";"
        searchArray += vine.id
        count++
    })
    url += encodeURIComponent(searchArray)
    return url
}

export default GenerateCompilationButton