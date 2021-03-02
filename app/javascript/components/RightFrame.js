import React from "react"
import RemoveAllButton from "./RemoveAllButton.js"
import SelectedVineList from "./SelectedVineList.js"
import GenerateCompilationButton from "./GenerateCompilationButton.js"

class RightFrame extends React.Component {

    render()
    {
        return (
            <div className = "rightFrame">
                <RemoveAllButton />
                <SelectedVineList />
                <GenerateCompilationButton />
            </div>
        )
    }
}

export default RightFrame