function createArray(currentArray, data){
    if(Array.isArray(data)) {
        if(currentArray?.length){
            data.forEach(item => {
                if(!currentArray.includes(item)) {
                    currentArray.push(item)
                }
            })
        } else {
            currentArray = data
        }
    } else {
        if(currentArray && !currentArray.includes(data)) {
            currentArray.push(data)
        } else {
            currentArray = []
            currentArray.push(data)
        }
    }

    return currentArray
}

export {createArray}