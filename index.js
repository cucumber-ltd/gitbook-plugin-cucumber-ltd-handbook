function getPersonNamed(book, name) {
  article = getArticleByTitle(book, name)
  return book.getPageByPath(article.path)
}

function getAllPeople(book) {
  return book.summary.getArticleByPath('people.md').articles.map(function(article) {
    return book.getPageByPath(article.path)
  })
}

function getArticleByTitle(book, title) {
  var path
  book.summary.walk(function(_article) {
    if (_article.title == title)
      path = _article.path
  })
  return book.summary.getArticleByPath(path)
}

module.exports = {
  filters: {

    // return the roles played by a particular person
    rolesPlayedBy(name) {
      var book = this
      var person = getPersonNamed(book, name)
      var roleTitles = person.roles || []
      return roleTitles.map(function(title) { return getArticleByTitle(book, title) })
    },

    // return all the people playing a given role
    peoplePlayingRole(roleTitle) {
      var book = this
      return getAllPeople(book).reduce(function(result, person) {
        var roleTitles = person.roles || []
        if (roleTitles.indexOf(roleTitle) >= 0)
          return result.concat(person)
        return result
      }, [])
    }
  }
};
