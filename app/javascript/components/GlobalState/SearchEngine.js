class SearchEngine {
    constructor() {
        this.searchResults = []
        this.fetchResults = this.fetchResults.bind(this)
        this.urlBuilder = this.urlBuilder.bind(this)
    }

    performSearch(searchTitle, searchAuthor, searchTags, searchDialogue) {
        let { url, count } = this.urlBuilder(searchTitle, searchAuthor, searchTags, searchDialogue)
        if (count === 0)
            return
        console.log("URL: ", url)
        this.fetchResults(url)
    }

    fetchResults(url) {
        fetch(url)
        .then((response) => {
            console.log("Got response")
            return response.json()
        })
        .then((data) => {
            console.log("Processing response data")
            console.log(data)
            console.log("Data length: ", data.length)
            this.searchResults = data
        })
        .catch((err) => {
            console.log(err)
            searchResults = []
        })
    }

    urlBuilder(title, author, tags, dialogue) {
                console.log("Building the URL to search")
                let url = "./vines/search?"
                let count = 0
                if (title != "")
                {
                    let searchTitle = encodeURIComponent(title)
                    url += "title=" + searchTitle
                    count++
                }
                if (author != "")
                {
                    if (count > 0)
                        url += "&"
                    let searchAuthor = encodeURIComponent(author)
                    url += "author=" + searchAuthor
                    count++
                }
                if (tags != "")
                {
                    if (count > 0)
                        url += "&"
                    let searchTags = encodeURIComponent(tags)
                    url += "tags=" + searchTags
                    count++
                }
                if (dialogue != "")
                {
                    if (count > 0)
                        url += "&"
                    let searchDialogue = encodeURIComponent(dialogue)
                    url += "dialogue=" + searchDialogue
                    count++
                }
                return { url: url, count: count }
    }
}

export default SearchEngine