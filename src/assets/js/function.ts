function createArray(currentArray:[], data:string | []):[] | string{
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
        if(currentArray && !currentArray.includes(data as never)) {
            currentArray.push(data as never)
        } else {
            currentArray = []
            currentArray.push(data as never)
        }
    }

    return currentArray
}

function searchParagraph(p:string):string {
    p = p.slice(3, p.length - 4)
    return p
}

export {createArray, searchParagraph}