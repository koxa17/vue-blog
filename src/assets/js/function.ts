function createArray(currentArray:[], data:string | []):[] | string{

    if(Array.isArray(data)) {
        data.forEach(item => {
            if(!currentArray.includes(item)) {
                currentArray.push(item)
            }
        })
    } else {
        if(!currentArray.includes(data as never)) {
            currentArray.push(data as never)
        }
    }

    return currentArray
}

export {createArray}