/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"OBGGeYOHlwKbVqW5","label":"reddit","bookmarks":[{"id":"BBCaqsqoZrC4oqNf","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"qB74dRCkbM610qf2","label":"r/archlinux","url":"https://www.reddit.com/r/archlinux/"},{"id":"BQLhL3KmEDIoTAy6","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"CLc5Nbu9l63fa7Ii","label":"Code'n'stuff","bookmarks":[{"id":"1SG5IH4TarFtEeln","label":"Github","url":"https://github.com/"},{"id":"hnqj7wQ0sxlS43vM","label":"Tensorflow","url":"https://www.tensorflow.org/"},{"id":"6a1ywxXGs3mAw0es","label":"PyTorch","url":"https://pytorch.org/"},{"id":"bTU7UJ1ZyKXLvWTI","label":"Kaggle","url":"https://www.kaggle.com/"}]},{"id":"oJEkBGatxGxFzZu2","label":"Fun","bookmarks":[{"id":"6waGiNhKjC8R6rS1","label":"Meme","url":"https://www.reddit.com/r/memes/"},{"id":"wse2wm3gVLdumIZw","label":"YouTube","url":"https://www.youtube.com/"},{"id":"PB7scDd5EKaCoZsw","label":"Wordle","url":"https://www.nytimes.com/games/wordle/index.html"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
