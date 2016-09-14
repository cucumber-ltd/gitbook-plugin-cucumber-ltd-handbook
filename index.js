module.exports = {
  filters: {
    // return a new, filtered Array of articles where the given property matches one of the values
    oneOf(articles, property, values) {
      values = values || []
      return articles.reduce(function(result, article) {
        if (values.indexOf(article[property]) >= 0) {
          return result.concat([article])
        }
        return result;
      }, [])
    },

    // find articles with the given title
    findArticlesUnderTitle: function(title) {
      var path
      this.summary.walk(function(_article) {
        if (_article.title == title)
          path = _article.path
      })
      return this.summary.getArticleByPath(path).articles
    }
  }
};
