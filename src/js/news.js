
function GetNoticias (tema) {
  const NewsAPI = require('newsapi');
  const newsapi = new NewsAPI('40eaceacebcd4c37a2255b3fe5ec635e');
  newsapi.v2.topHeadlines({
    category: tema,
    language: 'pt',
    country: 'br'
  }).then(response => {
    // console.log(response);
    CriaHTMLNoticias(response);
  });

}



function CriaHTMLNoticias (response) {
  for (let i = 0; i < 6; i++){
    console.log(response.articles[i].title);
    console.log(response.articles[i].urlToImage);
    console.log(response.articles[i].content);
    console.log(response.articles[i].url);
    console.log(response.articles[i].author);
    console.log(response.articles[i].publishedAt);
    console.log("\n\n\n\n")

  }
}


GetNoticias("business");
