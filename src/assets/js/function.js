function createArray(currentArray, data) {
    if (Array.isArray(data)) {
        if (currentArray?.length) {
            data.forEach(item => {
                if (!currentArray.includes(item)) {
                    currentArray.push(item)
                }
            })
        } else {
            currentArray = data
        }
    } else {
        if (currentArray && !currentArray.includes(data)) {
            currentArray.push(data)
        } else {
            currentArray = []
            currentArray.push(data)
        }
    }

    return currentArray
}

function articleTitle(articles) {
    let title = ''
    let start = articles.article.search('<h1>')
    let end = articles.article.search('<p>')
    title = articles.article.slice(start, end).replace(/<h1>/g, '').replace(/<\/h1>/g, '')

    return title
}

function articleDesc(articles) {

    let desc = ''
    let regArrHead = ['h2', 'h3', 'h4', 'h5', 'h6']
    let description = articles.article.replace(/<p><br><\/p>/g, '')
    for (let i = 0; i < regArrHead.length; i++) {
        description = description.replace(new RegExp(`<h${regArrHead[i]}>`, 'g')).replace(new RegExp(`</h${regArrHead[i]}>`, 'g'))
    }

    let start = description.search('<p>')
    let end = description.search('</p>')
    desc = description.slice(start, end + 4)

    return desc.replace(/<p>/g, '').replace(/<\/p>/g, '')
}

export {
    createArray, articleTitle,
    articleDesc
}