const Reducer = (state, action) => {
    let startIndex = 0;
    let tempArray = [...state.selectedVines]
    let numSelected = tempArray.length

    switch(action.type) {
        case 'MOVE_TARGET_UP':
            console.log(`Reducer is moving vine ${action.payload} up.`)
            startIndex = state.selectedVines.indexOf(action.payload)
            if (startIndex === 0) {   
                tempArray.shift()
                return { 
                    ...state, 
                    selectedVines: [...tempArray, action.payload]
                }
            }
            tempArray[startIndex] = tempArray[startIndex - 1]
            tempArray[startIndex - 1] = action.payload
            return { 
                ...state,
                selectedVines: tempArray
            }

        case 'MOVE_TARGET_DOWN':
            console.log(`Reducer is moving vine ${action.payload} down.`)
            startIndex = state.selectedVines.indexOf(action.payload)
            if (startIndex === (numSelected - 1)) {  
                tempArray = tempArray.slice(0, numSelected - 1)
                return { 
                    ...state, 
                    selectedVines: [action.payload, ...tempArray]
                }
            }
            tempArray[startIndex] = tempArray[startIndex + 1]
            tempArray[startIndex + 1] = action.payload
            return { 
                ...state,
                selectedVines: tempArray
            }

        case 'REMOVE_TARGET':
            console.log(`Reducer is removing target: ${ action.payload }`)
            // update the selectedVines array by filtering out the vine with the provided id
            return {
                ...state, 
                selectedVines: state.selectedVines.filter(vine => vine != action.payload)
            }

        case 'ADD_TARGET':
            console.log(`Reducer is adding target: ${ action.payload}`)
            // if the selectedVines already contains this element, then just return the state as is
            if (state.selectedVines.includes(action.payload))
                return { ...state }

            // if the vine id is not already in the selectedVines array, append it
            return {
                ...state,
                selectedVines: [...state.selectedVines, action.payload ]
            }

        case 'REMOVE_ALL_TARGETS':
            console.log("Reducer is removing all selected vines")
            return { 
                ...state,
                selectedVines: []
             }
    }
}

export default Reducer