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

function searchParagraph(p:string):string {
    p = p.slice(3, p.length - 4)
    return p
}

export {createArray, searchParagraph}